import requests
import json

# location serving the API
api_host = '127.0.0.1:5000'

try:
    result = requests.get(f'http://{api_host}/getsponsors')
    print(result.json())
except:
    print('failed' + result.json())