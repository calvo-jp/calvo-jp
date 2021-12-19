from typing import Generic, Optional, TypeVar

from pydantic import BaseModel
from pydantic.generics import GenericModel

from .utils import camelize


class Project:
    def __init__(
        self,
        *,
        slug: str,
        name: str,
        description: str,
        keywords: Optional[list[str]] = None,
        techstacks: Optional[list[str]] = None,
        banner: Optional[str] = None,
        screenshots: Optional[list[str]] = None,
    ):
        self.slug = slug
        self.name = name
        self.description = description
        self.keywords = keywords or []
        self.techstacks = techstacks or []
        self.banner = banner or ""
        self.screenshots = screenshots or []


class ReadProject(BaseModel):
    slug: str
    name: str
    description: str
    techstacks: list[str]
    banner: str
    screenshots: list[str]

    class Config:
        orm_mode = True


PaginatedT = TypeVar('PaginatedT')


class Paginated(GenericModel, Generic[PaginatedT]):
    rows: list[PaginatedT]
    total_rows: int
    page: int
    page_size: int
    has_next: bool
    search: Optional[str]

    class Config:
        alias_generator = camelize
        allow_population_by_field_name = True


class CreateEmail(BaseModel):
    sender: str
    subject: Optional[str]
    body: str

    @property
    def reciever(self) -> str:
        return "calvojp92@gmail.com"
