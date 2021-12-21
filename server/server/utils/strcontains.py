def strcontains(subject: str, search: str):
    """Checks whether the subject contains the search string"""

    def normalize(string: str):
        return string.replace(" ", "").lower()

    search = normalize(search)
    subject = normalize(subject)

    return subject.find(search) > -1
