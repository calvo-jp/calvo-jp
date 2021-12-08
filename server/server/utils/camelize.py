def camelize(subject: str):
    words = subject.split("_")
    array = []

    for index, word in enumerate(words):
        array.append(word.capitalize() if index > 0 else word)

    return "".join(array)
