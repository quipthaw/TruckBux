import requests
import json

# location serving the API
api_host = '127.0.0.1:5000'

try:
    result = requests.post(f'http://{api_host}/register', json={'user': 'regtest62', 'pass': 'NewPassword$', 'email': 'test@gmail.com', 'fname': 'test', 'lname': 'test'})
    print(result.json())
except:
    print('insert failed' + result.json())
