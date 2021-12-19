from datetime import timedelta

from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from redis import Redis

from .. import utils
from ..config import config
from ..models import CreateEmail

router = APIRouter(prefix="/emails", tags=["email"])

counter = Redis(
    host=config.redis_host,
    port=config.redis_port,
    db=config.redis_db,
    decode_responses=True
)


@router.post(path="/", status_code=status.HTTP_202_ACCEPTED)
async def send_email(*, data: CreateEmail):
    total = counter.get(data.sender) or 0

    if isinstance(total, str):
        total = int(total)

    if total == 3:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many emails sent"
        )

    utils.send_email(
        sender=data.sender,
        reciever=data.reciever,
        subject=data.subject,
        body=data.body
    )

    if total == 0:
        counter.setex(data.sender, timedelta(hours=24), 0)
    counter.incr(data.sender, 1)
