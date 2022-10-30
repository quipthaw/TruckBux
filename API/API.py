import queue
import datetime
import requests
import json
import math
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine, text
from helpers import *


# Function to get a new ebay client token
# DEFINE EBAY TOKEN DETAILS
TOKEN_URL = "https://api.sandbox.ebay.com/identity/v1/oauth2/token"
EBAY_TOKEN = ""
EXPIRES = datetime.datetime.now()


def new_token():
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic Q2hhc2VHdW4tVHJ1Y2tCdXgtU0JYLWIzM2MxM2I3Mi00YTA4ODc2OTpTQlgtMzNjMTNiNzJhYmEwLWMyNWMtNGNkNi04NWIzLWRlZmU="
    }
    body = {
        "grant_type": "client_credentials",
        "scope": "https://api.ebay.com/oauth/api_scope"
    }

    resp = requests.post(TOKEN_URL, headers=headers, data=body)
    data = json.loads(resp.content)
    global EBAY_TOKEN
    EBAY_TOKEN = data['access_token']
    global EXPIRES
    EXPIRES = datetime.datetime.now() + datetime.timedelta(seconds=7200)


# DEFINE THE DATABASE CREDENTIALS
DBUSER = 'admin'
DBPASSWORD = 'ChaseNathanManningNick27$'
DBHOST = 'team-27.cobd8enwsupz.us-east-1.rds.amazonaws.com'
DBPORT = 3306
DB = 'TruckBux'

PASS_COMP_REQS = 'Password must contain 8 characters, 1 uppercase, and 1 special character'


app = Flask(__name__)
CORS(app, origins=['http://127.0.0.1:3000'])

# PYTHON FUNCTION TO CONNECT TO THE MYSQL DATABASE AND
# RETURN THE SQLACHEMY ENGINE OBJECT


def get_connection():
    return create_engine(
        url="mysql+pymysql://{0}:{1}@{2}:{3}/{4}".format(
            DBUSER, DBPASSWORD, DBHOST, DBPORT, DB
        )
    )


db_connection = get_connection()


# Endpoint to lock or unlock account via post request in from {'user': <username>, 'action': ('l' or 'u')}
@app.route('/lockeduntil', methods=['POST'])
@cross_origin()
def lockeduntil():
    username = request.json['user']
    lock_or_unlock = request.json['action']
    res = jsonify('error, no result')
    if lock_or_unlock[0] == 'l':
        # currently only locks account by incriments of 1 year.
        result = lock_account(db_connection, username, 1)
        if result == False:
            res = jsonify('Failed')
        else:
            res = jsonify('Passed')
    elif lock_or_unlock[0] == 'u':
        result = unlock_account(db_connection, username)
        if result == False:
            res = jsonify('Failed')
        else:
            res = jsonify('Passed')
    return (res)


# Endpoint that takes a username via post request in from {'user': <username>}
# and returns all of it's user info
# @return correct user info | 'Error, Invalid User' in result field
@app.route("/getprofile", methods=['POST'])
@cross_origin()
def get_profile():
    # Parameterized queries protect against sqli
    usr_str = ["foo"] * 11
    query = text('SELECT * from Users where username = :x')
    param = {'x': request.json['user']}
    my_data = db_connection.execute(query, param).first()
    if my_data != None:
        i = 0
        for row in my_data:
            usr_str[i] = str(row)
            i = i + 1
        user = []
        user_val = {
            "username": usr_str[0],
            "email": usr_str[2],
            "fName": usr_str[3],
            "lName": usr_str[4],
            "acctType": usr_str[5],
            "sponsorID": usr_str[6],
            "dateCreated": usr_str[7],
            "lockedUntil": usr_str[8],
            "active": usr_str[9],
            "bio": usr_str[10]
        }
        user.append(user_val)
        return jsonify({"user": user})
    else:
        return (jsonify('Error, Invalid User'))


# Endpoint that checks if a given username, password, and email are valid
# If the data is valid it inserts the new user into the databases
# if the data is not valid it returns 'error': 'True' and the corresponding errors
@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    username = request.json['user']
    password = request.json['pass']
    fname = request.json['fname']
    lname = request.json['lname']
    email = request.json['email']
    active = 1
    if 'type' in request.json:
        act_type = request.json['type']
    else:
        act_type = 'D'

    resp = {'error': 'False'}

    # Check for valid data
    if check_username(db_connection, username) == False:
        resp['error'] = 'True'
        resp['username'] = 'username taken'
    if check_password(password) == False:
        resp['error'] = 'True'
        resp['password'] = PASS_COMP_REQS
    if check_email(email) == False:
        resp['error'] = 'True'
        resp['email'] = 'Expected email in the form XXX@XXX.XXX'

    if resp['error'] == 'False':
        try:
            hashed_pass = hash_password(password)

            # Insert record into Database
            query = text(
                "INSERT INTO TruckBux.Users(username, password, email, fName, lName, acctType, active) VALUES(:x, :y, :z, :j, :k, :l, :a)")
            param = {'x': username, 'y': hashed_pass,
                     'z': email, 'j': fname, 'k': lname, 'l': act_type,
                     'a': active}
            db_connection.execute(query, param)
            return jsonify(resp)
        except:
            resp['error'] = 'True'
            resp['insert'] = 'Registration failed'
            return jsonify(resp)
    else:
        return jsonify(resp)


# Endpoint to insert sponsor data into the Sponsors table
@app.route('/createsponsor', methods=['POST'])
@cross_origin()
def create_sponsor():
    resp = {'error': 'False'}
    name = request.json['name']
    rate = request.json['rate']

    if (check_sponsor_name(db_connection, name) == False):
        resp['error'] = 'True'
        resp['reason'] = 'Name Taken'
    else:
        query = text(
            'INSERT INTO TruckBux.Sponsors(sponsorName, pointConversionRate) VALUES(:x, :y)')
        param = {'x': name, 'y': rate}

        try:
            db_connection.execute(query, param)
        except:
            resp['error'] = 'True'
            resp['reason'] = 'Insert Failed'

    return resp


# Endpoint that takes a password and username via post request in from {'user': <username>, 'pass': <password>}
# and checks that the username and password exist together
# @return 'True' | 'False' in result field
@app.route('/checklogin', methods=['POST'])
@cross_origin()
def check_login():
    result = {'result': 'False'}

    # Parameterized queries protect against sqli
    query = text('select username, password from Users where username = :x')
    param = {'x': request.json['user']}

    row = db_connection.execute(query, param).first()

    if row != None:
        pass_hash = row[1]
        input_pass = request.json['pass'].encode()

        if bcrypt.checkpw(input_pass, pass_hash):
            result['result'] = 'True'

    return (jsonify(result))


@app.route('/catalog', methods=['POST'])
@cross_origin()
def get_catalog():
    if EXPIRES < datetime.datetime.now():
        new_token()

    search = request.json['search']
    price = request.json['price']
    category = request.json['category']

    queryURL = f"https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?category_ids={category}&filter=price:{price},priceCurrency:USD"

    if search != "":
        queryURL += '&q=' + search + '&auto_correct=KEYWORD'

    header = {
        "Authorization": "Bearer " + EBAY_TOKEN
    }
    print(queryURL)
    resp = requests.get(
        queryURL, headers=header)

    items = []
    if json.loads(resp.content)["total"] == 0:
        return jsonify({"items": items})
    data = json.loads(resp.content)['itemSummaries']
    for item in data:
        itemObject = {
            "itemId": "",
            "title": "",
            "image": "",
            "price": "",
        }
        if item['adultOnly'] == False:
            itemObject["itemId"] = item["itemId"]
            itemObject["title"] = item["title"]
            itemObject["price"] = str(math.ceil(float(item["price"]["value"])))
            if "image" in item:
                itemObject["image"] = item["image"]["imageUrl"]
            else:
                itemObject["image"] = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr40W2krm7bk8rMzHeoQV4Mu8G6D8SGeKttA&usqp=CAU"
            items.append(itemObject)

    return jsonify({"items": items})


# Endpoint that updates profile info.
# Request should have all fields present and blank if not being updated.
# user must have a value when request is sent to the endpoint
# {'user': 'test', 'fname': 'john', 'lname': ''}
# if the data is not valid it returns 'error': 'True' and the corresponding errors
@app.route('/updateprof', methods=['POST'])
@cross_origin()
def update_profile():
    username = request.json['user']
    fname = request.json['fname']
    lname = request.json['lname']
    email = request.json['email']
    bio = request.json['bio']

    resp = {'error': 'False'}
    query = "UPDATE TruckBux.Users SET "
    param = {'u': username}

    if email != '':
        if check_email(email) == False:
            resp['error'] = 'True'
            resp['email'] = 'Expected email in the form XXX@XXX.XXX'
        else:
            query += "`email` = :x"
            param['x'] = email
    if fname != '':
        param['y'] = fname
        if email != '':
            query += ", `fName` = :y"
        else:
            query += "`fName` = :y"
    if lname != '':
        param['z'] = lname
        if email != '' or fname != '':
            query += ", `lName` = :z"
        else:
            query += "`lName` = :z"
    param['w'] = bio
    query += ", `bio` = :w"

    query += " WHERE `username` = :u"

    if resp['error'] == "False":
        db_connection.execute(text(query), param)

    return (jsonify(resp))


# Endpoint that takes a username and login result via post request in from {'user': <username>, 'lresult': <login result>}
# and inserts their login attempt into the database
# User MUST exist in the User table to be inserted
# @return 'Success' | 'Failure' in result field
@app.route('/userlogin', methods=['POST'])
@cross_origin()
def user_login():
    username = request.json['user']
    result = {'result': 'Success'}
    # Checks to see if username is valid
    if (check_username(db_connection, username) == False):
        # Checks to see if too many failed login attempts
        query = text('select * from TruckBux.loginLog Where username = :x and result = :n and date_time >= (select date_time from TruckBux.loginLog WHERE result = :t ORDER BY ABS( DATEDIFF( date_time, NOW() ) ) DESC limit 1)')
        param = {'x': username, 'n': 'Failure', 't': 'Success'}
        my_data = db_connection.execute(query, param)
        i = 0
        for row in my_data:
            i = i + 1
        if (i <= 3):
            # Checks to see if account if timelocked
            query = text(
                'select * from TruckBux.Users Where username = :x and lockedUntil is NOT NULL')
            param = {'x': username}
            lock_result = db_connection.execute(query, param)
            if (lock_result.one_or_none() == None):
                # Checks to see if login combo is correct
                query = text(
                    'select username, password from Users where username = :x')
                param = {'x': request.json['user']}
                row = db_connection.execute(query, param).first()
                if row != None:
                    pass_hash = row[1]
                    input_pass = request.json['passwd'].encode()
                if bcrypt.checkpw(input_pass, pass_hash):
                    result = {'result': 'Success'}
                    log(db_connection, username, 'Success')
                else:
                    result = {'result': 'Invalid Password'}
                    log(db_connection, username, 'Failure')
            else:
                result = {'result': 'Account Locked'}
                log(db_connection, username, 'Failure')
        else:
            result = {'result': 'Too Many Failed Login Attempts!'}
            log(db_connection, username, 'Failure')
    else:
        result = {'result': 'Invalid Username'}
    return (jsonify(result))


# Endpoint that takes a username and login result via post request in from {'user': <username>, 'lresult': <login result>}
# and inserts their login attempt into the database
# User MUST exist in the User table to be inserted
# @return 'Success' | 'Failure' in result field
@app.route('/loginlog', methods=['POST'])
@cross_origin()
def log_login():
    username = request.json['user']
    logresult = request.json['lresult']

    result = {'result': 'Success'}
    if check_username(username) == False:
        query = text(
            "INSERT INTO TruckBux.loginLog (username, date_time, result) VALUES(:x, :d, :n)")
        param = {'x': username, 'n': logresult, 'd': datetime.datetime.now()}
        # Insert record of initial login into loginLog Table
        db_connection.execute(query, param)
    else:
        result = {'result': 'Failure'}
    return (jsonify(result))


# Endpoint that takes a username via post request in from {'user': <username>}
# and returns number of failed login attempts occurred since the last succesful login
# User MUST exist in the User table to be counted
# @return number of failed logins | 'error'
@app.route('/loginattempts', methods=['POST'])
@cross_origin()
def get_login_attempts():
    result = {'result': 'error'}
    username = request.json['user']
    if check_username(username) == False:
        query = text('select * from TruckBux.loginLog Where username = :x and result = :n and date_time >= (select date_time from TruckBux.loginLog WHERE result = :t ORDER BY ABS( DATEDIFF( date_time, NOW() ) ) DESC limit 1)')
        param = {'x': username, 'n': 'Failure', 't': 'Success'}
        my_data = db_connection.execute(query, param)
        i = 0
        for row in my_data:
            i = i + 1
        result['result'] = i
    else:
        result['result'] = 'error, invalid user'
    return (jsonify(result))


# Endpoint that updates user status,  via post request in from {'user': <username>, 'pass': <password>}
# Username should be valid in order to update
# Input for active must be a tinyint(1)
# {'user': 'test', 'active': '1'}
# @returns 'Success': 'Failure'
@app.route('/updatestatus', methods=['POST'])
@cross_origin()
def update_status():
    username = request.json['user']
    status = request.json['status']
    param = {'u': username, 'x': status}
    resp = {'response': 'Success'}
    if check_username(username) == False:
        query_one = 'SELECT active FROM TruckBux.Users WHERE username = :u'
        origStatus = db_connection.execute(text(query_one), param).first()
        if origStatus[0] == status:
            resp['response'] = 'Must be new status'
        else:
            query = 'UPDATE TruckBux.Users SET active = :x WHERE username = :u'
            db_connection.execute(text(query), param)
    else:
        resp['response'] = 'Failure'
    return (jsonify(resp))


# Endpoint to reset a user's password if they forgot
# Must provide the user's email, first name, and last name
# in order to reset the password
# @returns {'error': 'False'} if successful
@app.route('/resetpass', methods=['POST'])
@cross_origin()
def reset_password():
    modder = request.json['modder']
    email = request.json['email']
    fname = request.json['fname']
    lname = request.json['lname']
    new_pass = request.json['pass']
    user = request.json['user']

    query = text('select email, fname, lname from Users where username = :x')
    param = {'x': user}

    resp = {'error': 'False'}

    if check_password(new_pass) == False:
        resp['error'] = 'True'
        resp['reason'] = PASS_COMP_REQS
        return resp
    else:
        row = db_connection.execute(query, param).first()
        if row != None:
            if email == row[0] and fname == row[1] and lname == row[2]:
                query = text(
                    'UPDATE TruckBux.Users SET password = :x WHERE username = :y')
                param = {'x': hash_password(
                    new_pass), 'y': request.json['user']}

                try:
                    db_connection.execute(query, param)
                except:
                    resp['error'] = 'True'
                    resp['reason'] = 'Insert Failed'
            else:
                resp['error'] = 'True'
                resp['reason'] = 'User with that info does not exist'

    if 'reason' in request.json:
        reason = request.json['reason']
        log_pass_change(db_connection, modder, user, reason)
    else:
        log_pass_change(db_connection, modder, user)

    return resp


# Endpoint to retrieve all applications
# @returns {1: {app1}, 2: {app2}}
@app.route('/getallapps', methods=['GET'])
@cross_origin()
def get_all_apps():
    query = 'SELECT * FROM TruckBux.Applications'

    rows = db_connection.execute(text(query)).fetchall()

    apps = {}
    i = 1
    for row in rows:
        apps[i] = dict(row)
        apps[i]['sponsName'] = get_spons_name(db_connection, row['sponsorID'])
        i += 1

    return jsonify(apps)


# Endpoint to retrieve application data
# if given user=<username> returns all apps associated with that user
# if given sponsName=<sponsorName> returns all apps associated with that sponsor
# @returns {1: {app1}, 2: {app2}}
@app.route('/getappdata', methods=['GET'])
@cross_origin()
def get_app_data():
    if 'user' in request.json:
        user = request.json['user']
        query = 'SELECT * FROM TruckBux.Applications where username = :x'
        param = {'x': user}

        apps = {}
        rows = db_connection.execute(text(query), param).fetchall()
        i = 1
        for row in rows:
            apps[i] = dict(row)
            apps[i]['sponsName'] = get_spons_name(
                db_connection, row['sponsorID'])
            i += 1

    elif 'sponsName' in request.json:
        sponsName = request.json['sponsName']
        sponsID = get_spons_id(db_connection, sponsName)
        query = 'SELECT * FROM TruckBux.Applications where sponsorID = :x'
        param = {'x': sponsID}

        apps = {}
        rows = db_connection.execute(text(query), param).fetchall()
        i = 1
        for row in rows:
            apps[i] = dict(row)
            apps[i]['sponsName'] = sponsName
            i += 1

    return jsonify(apps)


# Endpoint to store application data
@app.route('/submitapp', methods=['POST'])
@cross_origin()
def submit_app():
    user = request.json['user']
    sponsID = request.json['sponsID']

    if not check_dup_app(db_connection, user, sponsID):
        query = 'INSERT INTO TruckBux.Applications (username, sponsorID) VALUES(:x, :y)'
        param = {'x': user, 'y': sponsID}

        try:
            db_connection.execute(text(query), param)
            resp = {'result': 'success'}
        except:
            resp = {'result': 'failure'}
    else:
        resp = {'error': 'duplicate application'}

    return jsonify(resp)


# Endpoint to retrieve all sponsor accounts
# @returns {1: {account1}, 2: {account2}}
@app.route('/getsponsors', methods=['GET'])
@cross_origin()
def getsponsors():
    query = 'SELECT * FROM TruckBux.Sponsors'
    rows = db_connection.execute(text(query)).fetchall()

    sponsors = []
    i = 0
    for row in rows:
        i += 1
        sponsors.append(dict(row))

    return jsonify({"number": i, "sponsors": sponsors})


# Endpoint to retrieve all users associated with a Sponsor
# takes in sponsName
# @returns {1: {account1}, 2: {account2}}
@app.route('/relateddrivers', methods=['POST'])
@cross_origin()
def get_related_drivers():
    accountName = request.json['accountName']
    acctType = get_acctType(db_connection, accountName)

    accounts = []

    if (acctType == 'S'):
        sponsID = get_spons_id(db_connection, accountName)

        query = 'SELECT username, email, fname, lname, bio, active, dateCreated, acctType FROM TruckBux.Users WHERE sponsorID = :x'
        param = {'x': sponsID}
        rows = db_connection.execute(text(query), param)

        for row in rows:
            accounts.append(dict(row))

    elif (acctType == 'A'):
        query = 'SELECT username, email, fname, lname, bio, active, dateCreated, acctType FROM TruckBux.Users'
        rows = db_connection.execute(text(query))

        for row in rows:
            accounts.append(dict(row))

    return jsonify({"accounts": accounts})


# Endpoint to insert data into the points table
# POST request takes in giver, reciever, points, reason
# returns success or failure
# GET request takes in driver and returns total points that driver has
@app.route('/points', methods=['POST', 'GET'])
@cross_origin()
def points():
    if request.method == 'POST':
        giver = request.json['giver']
        receiver = request.json['receiver']
        point_change = request.json['points']
        reason = request.json['reason']

        query = 'INSERT INTO TruckBux.Points (nameGiver, nameReceiver, pointChange, changeReason) '
        query += 'values(:x, :y, :j, :k)'
        param = {'x':giver, 'y':receiver, 'j':point_change, 'k':reason}

        try:
            db_connection.execute(text(query), param)
            return(jsonify({'result':'success'}))
        except:
            print('Insert Failed')
            return(jsonify({'result':'failure'}))
    elif request.method == 'GET':
        if 'driver' in request.json:
            driver = request.json['driver']
        
            query = 'SELECT pointChange FROM TruckBux.Points WHERE nameReceiver = :x'
            param = {'x': driver}
            
            results = db_connection.execute(text(query), param).fetchall()
            print(results)

            total_points = 0
            for result in results:
                total_points += result[0]
            
            print(total_points)
            return(jsonify({'pointTotal':total_points}))


app.run(debug=True)
