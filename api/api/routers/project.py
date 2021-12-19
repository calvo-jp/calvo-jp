import json
import os
from functools import lru_cache
from typing import Any, Optional

from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, Query

from ..config import Settings
from ..dependencies import get_config
from ..models import Paginated, Project, ReadProject

router = APIRouter(prefix="/projects", tags=["project"])


@lru_cache
def get_projects(*, config: Settings = Depends(get_config)):
    fullpath = os.path.join(config.assets_dir, "json", "projects.json")

    try:
        with open(fullpath) as file:
            items: list[dict[str, Any]] = json.load(file)

        return [Project(**item) for item in items]
    except [
        TypeError,
        FileNotFoundError,
        json.decoder.JSONDecodeError
    ] as error:
        if config.debug:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(error)
            ) from error

        return []


class Params:
    def __init__(
        self,
        *,
        search: Optional[str] = None,
        page: Optional[int] = Query(default=None, ge=1),
        page_size: Optional[int] = Query(
            default=None,
            ge=1,
            le=100,
            alias="pageSize"
        )
    ):
        self.page = page or 1
        self.page_size = page_size or 25
        self.search = search


def str_contains(subject: str, search: str):
    def normalize(string: str):
        return string.lower().replace(chr(0x20), "")  # that's just a space. lol!

    subject = normalize(subject)
    search = normalize(search)

    return subject.find(search) > -1


@router.get(
    path="/",
    response_model=Paginated[ReadProject],
    response_model_exclude_none=True
)
async def read_all(
    *,
    projects: list[Project] = Depends(get_projects),
    query: Params = Depends()
):
    rows: list[Project] = []

    if query.search is None:
        rows.extend(projects)
    else:
        for project in projects:
            searchables = [
                project.name,
                project.description,
                *project.techstacks
            ]

            for searchable in searchables:
                if str_contains(searchable, query.search):
                    rows.append(project)
                    break

    totalrows = len(rows)
    hasnext = query.page_size * query.page < totalrows
    start = query.page_size * (query.page - 1)
    until = query.page_size + start
    rows = rows[start:until]

    return dict(
        rows=rows,
        total_rows=totalrows,
        page=query.page,
        page_size=query.page_size,
        has_next=hasnext,
        search=query.search
    )


@router.get(
    path="/{slug}",
    response_model=ReadProject,
    response_model_exclude_none=True
)
async def read_one(*, slug: str, projects: list[Project] = Depends(get_projects)):
    for project in projects:
        if project.slug == slug:
            return project

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
