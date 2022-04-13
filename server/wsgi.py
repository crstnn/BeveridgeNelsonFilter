from gunicorn.http import message
from main_api import app
from gunicorn.app.wsgiapp import run

if __name__ == "__main__":
    message.MAX_REQUEST_LINE = 2 ** 14
    run()
    app.run()

