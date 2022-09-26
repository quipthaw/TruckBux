import requests
import json
 
# location serving the API
api_host = '127.0.0.1:5000'
 
results = requests.post(f'http://{api_host}/checkpassword', json={'usr': 'hopscotch', 'pwd' : 'boom'})
 
print(results.json()['results'])