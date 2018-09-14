import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def get_file(filename):
    with open(os.path.join(BASE_DIR, 'files/'+filename), 'rb') as file:
        return file.read()
