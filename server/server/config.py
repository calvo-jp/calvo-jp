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

    server_protocol: str
    server_host: str
    server_port: int
    server_extra: Optional[str] = None

    redis_host: str
    redis_port: int
    redis_db: int

    gmail_username: str

    @property
    def debug(self):
        return self.env == Environment.DEVELOPMENT

    @property
    def assets_dir(self):
        return os.path.abspath("assets")

    @property
    def server_base_url(self):
        url = '%s://%s:%s/%s' % (
            self.server_protocol,
            self.server_host,
            self.server_port,
            self.server_extra or ""
        )

        return url.removesuffix("/")


config = Config()
