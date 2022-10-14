import requests

# location serving the API
api_host = '127.0.0.1:5000'

try:
    result = requests.post(f'http://{api_host}/resetpass', json={'user': "nrabon", 'email': 'nrabon@clemson.edu',
     'fname': "Nick", 'lname': "Rabon", 'pass': 'PasswordChangeLog$', 'modder': 'nrabon'})
    print(result.json())
except:
    print('update failed' + result.json())