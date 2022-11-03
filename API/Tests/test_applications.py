import requests
import json

# location serving the API
api_host = '127.0.0.1:5000'

def test_post():
    try:
        result = requests.post(f'http://{api_host}/applications', json={'user':'nrabon', 'sponsName':'Adidas'})
        print(result.json())
    except:
        print('test failed' + result.json())

def test_get():
    try:
        result = requests.get(f'http://{api_host}/applications', json={})
        print(result.json())
    except:
        print('test failed')

test_get()
# test_post()