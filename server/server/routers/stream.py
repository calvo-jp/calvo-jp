import os

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse

from ..config import config

router = APIRouter(prefix='/streams', tags=['streams'])


@router.get(path='/media/{filename}', response_class=FileResponse)
async def view_image(filename: str):
    fullpath = os.path.join(config.assets_dir, 'images', filename)

    if not os.path.exists(fullpath):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return fullpath
