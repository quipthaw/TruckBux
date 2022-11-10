import requests
import json

# location serving the API
api_host = '127.0.0.1:5000'

def test_post():
    try:
        result = requests.post(f'http://{api_host}/Cart', json={'user':'nrabon', 'item':'20', 'num': 2, 'cost': '0', 'type': 'R'})
        print(result.json())
    except:
        print('test failed' + result.json())

def test_get():
    try:
        result = requests.get(f'http://{api_host}/Cart', json={'user':'plswork'})
        print(result.json())
    except:
        print('test failed')

def test_empty():
    try:
        result = requests.post(f'http://{api_host}/Cart', json={'user':'plswork', 'item':'-666'})
        print(result.json())
    except:
        print('test failed' + result.json())

test_post()
#test_get()