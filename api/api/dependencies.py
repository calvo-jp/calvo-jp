from functools import lru_cache

from .config import config


@lru_cache
def get_config():
    return config
