import requests
import json

# location serving the API
api_host = '127.0.0.1:5000'


def test_post():
    try:
        foo = {
                'user': 'mcgraha',
                'items' : [{
                    'itemId':'XX20',
                    'quantity': 1,
                    'price': '4'
                }, {
                    'itemId':'XY44',
                    'quantity': 1,
                    'price': '4'
                }],
            }
        result = requests.post(f'http://{api_host}/Cart', json=foo)
        print(result.json())
    except:
        print('test failed' + result.json())


def test_one():
    try:
        foo = {
                'user': 'dabo',
                'items' : [{
                    'itemId':'v1|110552646899|0',
                    'quantity': 3,
                    'price': '30'
                }],
            }
        result = requests.post(f'http://{api_host}/Cart', json=foo)
        print(result.json())
    except:
        print('test failed' + result.json())


def test_get():
    try:
        result = requests.get(f'http://{api_host}/Cart', json={'user':'plswork'})
        print(result.json())
    except:
        print('test failed')

#test_post()
#test_get()
test_one()