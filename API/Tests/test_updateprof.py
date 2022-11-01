import requests
import json

# location serving the API
api_host = 'ec2-52-205-128-217.compute-1.amazonaws.com:8080'

try:
    result = requests.post(f'http://{api_host}/updateprof', json={'user': 'regtest62', 'email': 'abc@gmail.com', 'fname': '', 'lname': 'testupdaate2'})
    print(result.json())
except:
    print('update failed' + result.json())