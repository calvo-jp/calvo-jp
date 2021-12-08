import json
import os
from functools import lru_cache
from typing import Literal, Optional

from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, Path, Query
from fastapi.responses import Response
from pydantic import BaseModel

from ..config import config
from ..utils import camelize

router = APIRouter(prefix='/projects', tags=['project'])


TechStack = Literal[
    # frontend frameworks, ui-kit, etc.
    'react',
    'nextjs',
    'flutter',
    'tailwind',
    'material ui'
    # frontend languages, pre-processors, etc.
    'html',
    'css',
    'sass',
    'javascript',
    'typescript',
    'dart',
    # backend frameworks
    'fastapi',
    'express',
    'nestjs',
    # backend languages
    'python',
    'nodejs',
    # orms and odms
    'sqlalchemy',
    'sqlmodel',
    'prisma',
    # databases
    'postgres',
    'sqlite3',
    'mongodb',
]


class Project(BaseModel):
    id: str
    name: str
    description: str
    tags: set[str]
    banner: str
    screenshots: set[str]
    techstacks: set[TechStack]


@lru_cache
def get_projects():
    fullpath = os.path.join(config.assets_dir, 'json', 'projects.json')

    with open(fullpath, encoding='utf-8') as data:
        projects = json.load(data)
        projects = [Project.parse_obj(project) for project in projects]

        # appends server base url to files, eg:
        # original: /streams/images/filename.jpeg
        # modified: http://localhost:8000/streams/images/filename.jpeg
        for project in projects:
            project.banner = config.server_base_url + project.banner
            project.screenshots = set(
                config.server_base_url + screenshot for screenshot in project.screenshots
            )

        return sorted(projects, key=lambda p: p.id)


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
    rows: list[Project]
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


@router.get(path='/{id}', response_model=Project)
async def read_one(
    *,
    slug: str = Path(..., alias='id'),
    projects: list[Project] = Depends(get_projects)
):
    for project in projects:
        if project.id == slug:
            return project

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
