import os
from enum import Enum
from typing import Optional

from dotenv import load_dotenv
from pydantic import BaseSettings

load_dotenv()


class Environment(str, Enum):
    PRODUCTION = 'production'
    DEVELOPMENT = 'development'


class Config(BaseSettings):
    env: Optional[Environment] = None
    redis_host: str
    redis_port: int
    rapidapi_key: str
    gmail_username: str
    base_url: str

    @property
    def debug(self):
        return self.env == Environment.DEVELOPMENT

    @property
    def assets_dir(self):
        return os.path.abspath("assets")


config = Config()
