import json
import os
import typing

from fastapi import APIRouter, Depends, HTTPException, Path, status
from pydantic import BaseModel

from ..config import config

router = APIRouter(prefix='/projects', tags=['project'])


TechStack = typing.Literal[
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


async def get_projects():
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

        return projects


@router.get(path='/', response_model=list[Project], response_model_exclude_none=True)
async def read_all():
    return await get_projects()


@router.get(path='/{id}', response_model=Project, response_model_exclude_none=True)
async def read_one(
    *,
    slug: str = Path(..., alias='id'),
    projects: list[Project] = Depends(get_projects)
):
    for project in projects:
        if project.id == slug:
            return project

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
