import requests
import json

# location serving the API
api_host = '127.0.0.1:5000'

try:
    result = requests.post(f'http://{api_host}/updateprof', json={'user': 'regtest62', 'email': '', 'fname': '', 'lname': 'testupdaate2'})
    print(result.json())
except:
    print('update failed' + result.json())