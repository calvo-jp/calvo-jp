import json
import os
from functools import lru_cache
from typing import Any, Optional

from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, Query
from fastapi.responses import Response
from PIL import UnidentifiedImageError
from pydantic import BaseModel

from ..config import config
from ..models import Project, ReadProject
from ..utils import camelize

router = APIRouter(prefix='/projects', tags=['project'])


@lru_cache
def get_projects():
    fullpath = os.path.join(config.assets_dir, "json", "projects.json")

    if not os.path.exists(fullpath):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to find 'projects.json'"
        )

    with open(fullpath, encoding='utf-8') as data:
        items: list[dict[str, Any]] = json.load(data)

    projects: list[Project] = []

    for item in items:
        try:
            projects.append(Project(**item))
        except (FileNotFoundError, UnidentifiedImageError) as error:
            if config.debug:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=str(error)
                ) from error

    return projects


class QueryParams:
    def __init__(
        self,
        *,
        page: Optional[int] = Query(default=1, ge=1),
        page_size: Optional[int] = Query(
            default=25,
            alias='pageSize',
            le=100,
            ge=1,
        ),
        search: Optional[str] = None
    ):
        self.page = page or 1
        self.page_size = page_size or 25
        self.search = search


class Paginated(BaseModel):
    page: int
    page_size: int
    total_rows: int
    rows: list[ReadProject]
    has_next: bool
    search: Optional[str] = None

    class Config:
        alias_generator = camelize
        allow_population_by_field_name = True


def contains(subject: str, search: str):
    """Checks whether the subject contains the search string"""

    def normalize(string: str):
        return string.replace(" ", "").lower()

    search = normalize(search)
    subject = normalize(subject)

    return subject.find(search) > -1


@router.get(
    path='/',
    response_model=Paginated,
    response_model_exclude_none=True,
)
async def read_all(
    *,
    query: QueryParams = Depends(),
    projects: list[Project] = Depends(get_projects),
    response: Response
):
    rows = projects if query.search is None else []

    if query.search is not None:
        for project in projects:
            subjects = [
                project.name,
                project.description,
                *project.tags,
                *project.techstacks,
            ]

            for subject in subjects:
                if contains(subject, query.search):
                    rows.append(project)
                    break

    totalrows = len(rows)
    hasnext = totalrows - (query.page * query.page_size) > 0
    start = query.page_size * (query.page - 1)
    until = query.page_size + start
    rows = rows[start:until]

    if hasnext:
        response.status_code = status.HTTP_206_PARTIAL_CONTENT

    return dict(
        rows=rows,
        total_rows=totalrows,
        has_next=hasnext,
        page=query.page,
        page_size=query.page_size,
        search=query.search
    )


@router.get(path='/{slug}', response_model=ReadProject)
async def read_one(
    *,
    slug,
    projects: list[Project] = Depends(get_projects)
):
    for project in projects:
        if project.slug == slug:
            return project

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
