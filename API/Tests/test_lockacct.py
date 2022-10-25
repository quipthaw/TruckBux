import requests
import json
import datetime
 
# location serving the API
api_host = '127.0.0.1:5000'
 
results = requests.post(f'http://{api_host}/lockeduntil', json={'user': 'inserttest', 'action': 'l'})
 
print(results.json())