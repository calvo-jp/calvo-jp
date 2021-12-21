import smtplib
from typing import Optional


def sendmail(
    *,
    to: str,
    from_: str,
    subject: Optional[str] = None,
    body: str,
):
    pass
