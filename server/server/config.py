from enum import Enum
from typing import Optional

from dotenv import load_dotenv
from pydantic import BaseSettings

load_dotenv()


class Environment(str, Enum):
    PRODUCTION = 'production'
    DEVELOPMENT = 'development'


class Config(BaseSettings):
    env: Optional[Environment]
    redis_host: str
    redis_port: int
    rapidapi_key: str
    gmail_username: str

    @property
    def production(self):
        return self.env == Environment.PRODUCTION

    @property
    def development(self):
        return self.env in [None, Environment.DEVELOPMENT]


config = Config()
