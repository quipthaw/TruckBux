import requests
import json
 
# location serving the API
api_host = 'ec2-52-205-128-217.compute-1.amazonaws.com:8080'
 
results = requests.post(f'http://{api_host}/checklogin', json={'user': 'hashuser', 'pass' : 'HashThisPlease$'})
 
print(results.json())