import requests
import json

# location serving the API
api_host = '127.0.0.1:5000'

try:
    result = requests.post(f'http://{api_host}/register', json={'user': 'nrabon3', 'pass': 'clemsonTigers$', 'email': 'nrabon@gmail.com', 'fname': 'Nick', 'lname': 'Rabon'})
    print(result.json())
except:
    print('insert failed')
