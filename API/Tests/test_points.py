import requests
import json

# location serving the API
api_host = '127.0.0.1:5000'


def test_post():
    try:
        result = requests.post(f'http://{api_host}/points', json={'giver':'testSponsor', 'receivers':['dabo'], 'points':'100', 'reason':'safe driving'})
        print(result.json())
    except:
        print('test failed' + result.json())

def test_multiple_post():
    try:
        result = requests.post(f'http://{api_host}/points', json={'giver':'testSponsor', 'receivers':['nrabon', 'newGuy'], 'points':'10', 'reason':'safe driving'})
        print(result.json())
    except:
        print('test failed' + result.json())

def test_all_post():
    try:
        result = requests.post(f'http://{api_host}/points', json={'giver':'Adidas', 'receivers':['all', 'newGuy'], 'points':'10', 'reason':'safe driving'})
        print(result.json())
    except:
        print('test failed' + result.json())

def test_get():
    try:
        result = requests.get(f'http://{api_host}/points', json={'driver':'nrabon'})
        print(result.json())
    except:
        print('test failed')

test_post()
#test_multiple_post()  
#test_all_post()
#test_get()