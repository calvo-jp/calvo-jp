from datetime import timedelta
from typing import Optional

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from redis import Redis

from ..config import config
from ..utils import sendmail

router = APIRouter(prefix='/emails', tags=['email'])
counter = Redis(
    host=config.redis_host,
    port=config.redis_port,
    db=config.redis_db,
    decode_responses=True
)


class CreateEmail(BaseModel):
    sender: EmailStr
    subject: Optional[str] = Field(default=None, min_length=10, max_length=25)
    body: str = Field(..., min_length=25, max_length=255)

    class Config:
        anystr_lower = True
        anystr_strip_whitespace = True


@router.post(
    path='/',
    status_code=status.HTTP_202_ACCEPTED,
    response_model_exclude_none=True,
)
async def send_email(*, data: CreateEmail):
    total_sent = counter.get(data.sender) or 0

    if not isinstance(total_sent, int):
        total_sent = int(total_sent)

    # check for quota
    if total_sent > 3:
        raise HTTPException(
            status.HTTP_429_TOO_MANY_REQUESTS,
            detail="You've reached the quota of 3 emails in 24hrs."
        )

    sendmail(
        to=config.gmail_username,
        from_=data.sender,
        subject=data.subject,
        body=data.body
    )

    # successful email
    if total_sent == 0:
        counter.setex(data.sender, timedelta(hours=24), 0)
    counter.incr(data.sender, 1)
