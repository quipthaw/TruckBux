import requests
import json

# location serving the API
api_host = '127.0.0.1:5000'

try:
    result = requests.post(f'http://{api_host}/createsponsor', json={'name': "testcreate",
      'rate': .75})
    print(result.json())
except:
    print('test failed' + result.json())