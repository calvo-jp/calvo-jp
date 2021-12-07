from datetime import date, timedelta
from typing import Optional

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from redis import Redis

from ..config import config

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

    if isinstance(total_sent, str):
        total_sent = int(total_sent)

    if total_sent >= 4:
        raise HTTPException(
            status.HTTP_429_TOO_MANY_REQUESTS,
            detail='Too many emails sent.'
        )

    if total_sent == 0:
        counter.setex(data.sender, timedelta(hours=24), 0)

    # TODO
    # send email here

    counter.incr(data.sender, 1)
    counter.incr(summary_id(), 1)


def summary_id():
    """returns today's summary id"""

    suffix = '_totalSentEmails'
    summid = date.today().strftime('%Y%m%d') + suffix

    if counter.get(summid) is None:
        counter.setex(summid, timedelta(hours=48), 0)

    return summid


class EmailSummary(BaseModel):
    total: int
    quota: bool


@router.get(
    path='/summary',
    response_model=EmailSummary,
    response_model_exclude_none=True
)
async def get_summary():
    total = counter.get(summary_id()) or 0

    if isinstance(total, str):
        total = int(total)

    return dict(total=total, quota=total >= 100)
