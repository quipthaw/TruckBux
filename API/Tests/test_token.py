import requests
import json

# location serving the API
api_host = 'ec2-52-205-128-217.compute-1.amazonaws.com:8080'

try:
    result = requests.get(f'http://{api_host}/catalog')
    print(result.json())
except:
    print('insert failed')