import requests
import json

# location serving the API
api_host = '127.0.0.1:5000'


def test_post():
    try:
        foo = {
                'user': 'mcgraha',
                'items' : [{
                    'item':'XX20',
                    'num': 1,
                    'cost': '4'
                }, {
                    'item':'XY44',
                    'num': 1,
                    'cost': '4'
                }],
            }
        result = requests.post(f'http://{api_host}/Cart', json=foo)
        print(result.json())
    except:
        print('test failed' + result.json())




def test_empty():
    try:
        foo = {
                'user': 'mcgraha',
                'items' : [{
                    'item':'-666',
                    'num': 1,
                    'cost': '0'
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

test_post()
#test_get()
#test_empty()