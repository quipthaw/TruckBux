import requests
import json

# location serving the API
api_host = '127.0.0.1:5000'

def test_post():
    try:
        result = requests.post(f'http://{api_host}/sponsors', json={'name':'nickstest5', 'rate':'7'})
        print(result.json())
    except:
        print('test failed' + result.json())

def test_get():
    try:
        result = requests.get(f'http://{api_host}/sponsors', json={'sponsName': 'Adidas'})
        print(result.json())
    except:
        print('test failed')

# test_get()
test_post()