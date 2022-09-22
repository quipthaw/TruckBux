import requests
import json

# location serving the API
api_host = '127.0.0.1:5000'

result = requests.post(f'http://{api_host}/checkuser', json={'user': 'testuser'})

print(result.json()['result'])