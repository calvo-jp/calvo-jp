from typing import Optional


def camelize(subject: str):
    words = subject.split("_")
    array = []

    for index, word in enumerate(words):
        if index > 0:
            word = word.capitalize()
        array.append(word)

    return "".join(array)


def send_email(
    *,
    sender: str,
    reciever: str,
    subject: Optional[str] = None,
    body: str
):
    pass
