import os

from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends
from fastapi.responses import FileResponse

from ..config import Settings
from ..dependencies import get_config

router = APIRouter(prefix="/images", tags=["image"])


@router.get(path="/{filename}", response_class=FileResponse)
async def stream_image(*, filename: str, config: Settings = Depends(get_config)):
    fullpath = os.path.join(config.assets_dir, "images", filename)

    if not os.path.exists(fullpath):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return fullpath
