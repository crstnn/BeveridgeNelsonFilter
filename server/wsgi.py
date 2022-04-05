from gunicorn.http import message
from main_api import app

message.MAX_REQUEST_LINE = 2 ** 14

if __name__ == "__main__":
    app.run()
