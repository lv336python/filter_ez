from app import app
from app.models import User


@app.route('/')
def index():
    return 'Hello!!!'
