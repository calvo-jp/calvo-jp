from datetime import date, timedelta
from typing import Optional

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from redis import Redis

from .config import config
from .utils import send_via_rapidapi

router = APIRouter()

summary = Redis(config.redis_host, config.redis_port, 0, decode_responses=True)
counter = Redis(config.redis_host, config.redis_port, 1, decode_responses=True)


class CreateEmail(BaseModel):
    sender: EmailStr
    subject: Optional[str] = Field(default=None, min_length=10, max_length=25)
    body: str = Field(..., min_length=25, max_length=255)

    class Config:
        anystr_strip_whitespace = True


@router.post(
    path='/emails',
    status_code=status.HTTP_202_ACCEPTED,
    response_model_by_alias=True,
    response_model_exclude_none=True,
)
async def send_email(data: CreateEmail):
    total_sent = counter.get(data.sender) or 0

    if isinstance(total_sent, str):
        total_sent = int(total_sent)

    if total_sent >= 4:
        raise HTTPException(
            status.HTTP_429_TOO_MANY_REQUESTS,
            detail='You have reached the limit of 4 emails per day.'
        )

    if total_sent == 0:
        counter.setex(data.sender, timedelta(hours=24), 0)

    try:
        response = send_via_rapidapi(
            sender=data.sender,
            recipient=config.gmail_username,
            subject=data.subject,
            body=data.body
        )

        counter.incr(data.sender, 1)
        summary.incr(summary_id(), 1)

        return response
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail='Something went wrong. Please try again later.'
        ) from error


def summary_id():
    return date.today().isoformat()


class EmailSummary(BaseModel):
    total: int
    quota: bool


@router.get(
    path='/emails/summary',
    response_model=EmailSummary,
    response_model_exclude_none=True
)
async def get_summary():
    key = summary_id()
    total = summary.get(key) or 0

    if isinstance(total, str):
        total = int(total)

    return dict(total=total, quota=total >= 100)
