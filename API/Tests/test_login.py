import requests
import json
 
# location serving the API
api_host = '127.0.0.1:5000'
 
results = requests.post(f'http://{api_host}/userlogin', json={'user': 'hashuser', 'passwd' : 'HashThisPlease$'})
 
print(results.json())