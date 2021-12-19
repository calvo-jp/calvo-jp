import os
from typing import Optional

from pydantic import BaseSettings


class Settings(BaseSettings):
    env: Optional[str]

    redis_host: str
    redis_port: int
    redis_db: int

    @property
    def assets_dir(self):
        fullpath = os.path.abspath(".assets")

        if not os.path.exists(fullpath):
            os.mkdir(fullpath)

        return fullpath

    @property
    def debug(self):
        return self.env == "development"

    def __hash__(self):
        return hash((type(self),) + tuple(self.__dict__.values()))

    class Config:
        env_file = ".env"


config = Settings()
