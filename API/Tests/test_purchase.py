import requests
import json


api_host = '127.0.0.1:5000'

def test_post():
    try:
        result = requests.post(f'http://{api_host}/purchase', json={'user':'dabo'})
        print(result.json())
    except:
        print('test failed' + result.json())

def test_get():
    try:
        result = requests.get(f'http://{api_host}/purchase', json={'user':'manning'})
        print(result.json())
    except:
        print('test failed')

test_post()
#test_get()