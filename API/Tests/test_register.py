import requests
import json

# location serving the API
api_host = 'ec2-52-205-128-217.compute-1.amazonaws.com:8080'

try:
    result = requests.post(f'http://{api_host}/register', json={'user': 'testdrive', 'pass': 'NewPassword$', 'email': 'test@gmail.com',
     'fname': 'test', 'lname': 'test'})
    print(result.json())
except:
    print('insert failed' + result.json())
