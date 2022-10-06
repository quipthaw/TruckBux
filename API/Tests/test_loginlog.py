import requests
import json
 
# location serving the API
api_host = '127.0.0.1:5000'
 
results = requests.post(f'http://{api_host}/loginlog', json={'user': 'plswork', 'lresult': 'Failure' })

print(results.json())

