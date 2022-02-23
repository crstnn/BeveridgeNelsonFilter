import requests

try:
    r = requests.get('https://bn-filtering.herokuapp.com/')
    if r.status_code == requests.codes.ok:
        print("keep_alive ping status: ALIVE")
    else:
        print("keep_alive ping status: DISCONNECTED")
except Exception as e:
    print("keep_alive ping status: FAILURE")
    print(e)
