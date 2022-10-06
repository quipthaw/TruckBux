import requests
import json

# location serving the API
api_host = '127.0.0.1:5000'

try:
    result = requests.post(f'http://{api_host}/updatestatus', json={'user': 'plswork', 'status': '1',})
    print(result.json())
except:
    print('update failed' + result.json())