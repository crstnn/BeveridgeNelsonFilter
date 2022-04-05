from gunicorn.http import message

message.MAX_REQUEST_LINE = 2 ** 14

from main_api import app

if __name__ == "__main__":
    app.run()
