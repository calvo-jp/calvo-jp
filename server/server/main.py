from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import config
from .routers import email, project

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins='*' if config.debug else 'https://calvojp.vercel.app',
    allow_methods='*',
    allow_headers='*',
)

app.include_router(router=email.router)
app.include_router(router=project.router)
