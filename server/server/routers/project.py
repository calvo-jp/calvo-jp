import json
import os
from typing import Literal

from fastapi import APIRouter, HTTPException, Path, status
from pydantic import BaseModel

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


def get_projects() -> list[Project]:
    fullpath = os.path.join(config.assets_dir, 'json', 'projects.json')

    with open(fullpath, encoding='utf-8') as data:
        projects = json.load(data)

        return [Project.parse_obj(project) for project in projects]


@router.get(path='/', response_model=list[Project])
async def read_all():
    return get_projects()


@router.get(path='/{id}', response_model=Project)
async def read_one(id_: str = Path(..., alias='id')):
    projects = get_projects()

    for project in projects:
        if project.id == id_:
            return project

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
