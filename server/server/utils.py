from typing import Optional

import httpx

from .config import config


def send_via_rapidapi(
    *,
    sender: str,
    recipient: str,
    subject: Optional[str] = None,
    body: str,
):
    url = 'https://fapimail.p.rapidapi.com/email/send'

    data = {
        'sender': sender,
        'recipient': recipient,
        'subject': subject,
        'message': body
    }

    headers = {
        'x-rapidapi-host': 'fapimail.p.rapidapi.com',
        'x-rapidapi-key': config.rapidapi_key,
    }

    response = httpx.post(url=url, json=data, headers=headers)
    response.raise_for_status()
    return response.json()
