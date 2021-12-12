import enum
import os

from fastapi import APIRouter, HTTPException, status
from fastapi.param_functions import Path
from fastapi.responses import FileResponse

from ..config import config

router = APIRouter(prefix='/streams', tags=['streams'])


class MediaType(str, enum.Enum):
    IMAGES = 'images'
    VIDEOS = 'videos'


@router.get(path='/{media}/{filename}', response_class=FileResponse)
async def view_media(
    *,
    type_: MediaType = Path(..., alias='type'),
    filename: str
):
    fullpath = os.path.join(config.assets_dir, type_, filename)

    if not os.path.exists(fullpath):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return fullpath
