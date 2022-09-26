import requests
import json

# location serving the API
api_host = '127.0.0.1:5000'


requests.post(f'http://{api_host}/insertusers', json={'insert_user': 'mcgraha', 'insert_passwd': 'clemson', 'insert_email': 'manning@clemson.com', 'insert_firstname': 'manning', 'insert_lastname': 'graham'})

result = requests.post(f'http://{api_host}/checkuser', json={'user': 'mcgraha'})

if(result.json()['result']== 'Username Not Taken'): 
    print("Insert Failed")
else: 
    print("Insert Succeeded")
 

