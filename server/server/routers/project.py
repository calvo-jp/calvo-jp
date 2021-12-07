import json
import os
from functools import lru_cache
from typing import Literal, Optional

from fastapi import APIRouter, Depends, HTTPException, Path, status
from pydantic import BaseModel, Field

from ..config import config

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
            project.banner = config.base_url + project.banner
            project.screenshots = {
                config.base_url + screenshot for screenshot in project.screenshots
            }

        return sorted(projects, key=lambda p: p.id)


class Query:
    def __init__(
        self,
        *,
        page: Optional[int] = None,
        page_size: Optional[int] = None,
        search: Optional[str] = None,
    ):
        self.page = page or 1
        self.page_size = page_size or 25
        self.search = search


class Paginated(BaseModel):
    page: int
    page_size: int = Field(..., alias='pageSize')
    total_rows: int = Field(..., alias='totalRows')
    rows: list[Project]
    has_next: bool = Field(..., alias='hasNext')


@router.get(path='/', response_model=Paginated, response_model_by_alias=True)
async def read_all(
    *,
    query: Query = Depends(),
    projects: list[Project] = Depends(get_projects),
):
    rows = projects if query.search is None else []

    if query.search is not None:
        for project in projects:
            if (
                project.name.lower().startswith(query.search.lower()) or
                project.description.lower().startswith(query.search.lower())
            ):
                rows.append(project)
                continue

            for tag in project.tags:
                if tag.lower().startswith(query.search.lower()):
                    rows.append(project)
                    continue

            for techstack in project.techstacks:
                if techstack.lower().startswith(query.search.lower()):
                    rows.append(project)
                    continue

    totalrows = len(rows)
    hasnext = totalrows - (query.page * query.page_size) > 0

    start = query.page_size * (query.page - 1)
    until = query.page_size + start

    rows = rows[start:until]

    return dict(
        rows=rows,
        total_rows=totalrows,
        has_next=hasnext,
        page=query.page,
        page_size=query.page_size,
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
