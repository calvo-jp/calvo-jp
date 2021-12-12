import enum
import os
from typing import Literal, Optional, TypedDict

from PIL import Image
from pydantic import BaseModel

from ..config import config

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


class Orientation(str, enum.Enum):
    SQUARE = 'square'
    PORTRAIT = 'portrait'
    LANDSCAPE = 'landscape'


class ImageInfo(TypedDict):
    url: str
    width: float
    height: float
    orientation: Orientation


class Project:
    def __init__(
        self,
        *,
        slug: str,
        name: str,
        description: str,
        tags: Optional[list[str]] = None,
        techstacks: Optional[list[TechStack]] = None,
        banner: str,
        screenshots: Optional[list[str]] = None,
        # pylint: disable=unused-argument
        **kwarg,
        # pylint: enable=unused-argument
    ):
        self.slug = slug
        self.name = name
        self.description = description
        self.tags = tags or []
        self.techstacks = techstacks or []

        self.__banner = banner
        self.__screenshots = screenshots or []

    @property
    def screenshots(self):
        imageinfolist = [_imageinfo(sc) for sc in self.__screenshots]
        return [i for i in imageinfolist if i is not None]

    @property
    def banner(self):
        return _imageinfo(self.__banner)


def _imageorient(width: float, height: float) -> Orientation:
    if height > width + height / 4:
        return Orientation.PORTRAIT
    if width > height + width / 4:
        return Orientation.LANDSCAPE
    return Orientation.SQUARE


def _imageinfo(filename: str):
    fullpath = os.path.join(config.assets_dir, "images", filename)
    image = Image.open(fullpath)

    info = ImageInfo(
        url=config.server_base_url + "/streams/images/" + filename,
        width=image.width,
        height=image.height,
        orientation=_imageorient(image.width, image.height)
    )

    image.close()
    return info


class ReadProject(BaseModel):
    slug: str
    name: str
    description: str
    tags: list[str]
    banner: ImageInfo
    screenshots: list[ImageInfo]
    techstacks: list[TechStack]

    class Config:
        orm_mode = True
