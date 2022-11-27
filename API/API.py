import datetime
import requests
import json
import math
import io
import base64
import matplotlib.pyplot as plt
from flask import Flask, request, jsonify, send_file
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
CORS(app, origins=[
     'https://dev.d2g18lgy66c0b0.amplifyapp.com/*', 'http://127.0.0.1:3000'])


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
            "dateCreated": usr_str[6],
            "lockedUntil": usr_str[7],
            "active": usr_str[8],
            "bio": usr_str[9]
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
    sponsor = request.json['sponsor']
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
            if sponsor != '':
                query = text(
                    "INSERT INTO TruckBux.Sponsorships (username, sponsorName, active) VALUES (:x, :y, :z)")
                param = {'x': username, 'y': sponsor, 'z': active}
                db_connection.execute(query, param)
            return jsonify(resp)
        except:
            resp['error'] = 'True'
            resp['insert'] = 'Registration failed'
            return jsonify(resp)
    else:
        return jsonify(resp)


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
        query = text('select * from TruckBux.Logging Where username = :x and result = :n and date_time >= (select date_time from TruckBux.Logging WHERE result = :t ORDER BY ABS( DATEDIFF( date_time, NOW() ) ) DESC limit 1)')
        param = {'x': username, 'n': 'Failure', 't': 'Success'}
        my_data = db_connection.execute(query, param)
        log_type = 'login'
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
                    log(db_connection, username, log_type, 'Success')
                else:
                    result = {'result': 'Invalid Password'}
                    log(db_connection, username, log_type, 'Failure')
            else:
                result = {'result': 'Account Locked'}
                log(db_connection, username, log_type, 'Failure')
        else:
            result = {'result': 'Too Many Failed Login Attempts!'}
            log(db_connection, username, log_type, 'Failure')
    else:
        result = {'result': 'Invalid Username'}
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
        query = text('select * from TruckBux.Logging Where username = :x and result = :n and date_time >= (select date_time from TruckBux.Logging WHERE result = :t ORDER BY ABS( DATEDIFF( date_time, NOW() ) ) DESC limit 1)')
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
    if check_username(db_connection, username) == False:
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
    log_type = 'password change'

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
        log_reason = request.json['reason']
        log(db_connection, user, log_type, modder=modder, reason=log_reason)
    else:
        log(db_connection, user, log_type, modder=modder)

    return resp


# @POST Endpoint to store application data
#
# @GET Endpoint to retrieve application information
# if given user=<username> returns all apps associated with that user
# if given sponsName=<sponsorName> returns all apps associated with that sponsor
# if given nothing, returns all applications
# @returns {1: {app1}, 2: {app2}}
@app.route('/applications', methods=['POST', 'GET', 'PATCH'])
@cross_origin()
def applications():
    if request.method == 'POST':
        user = request.json['user']
        sponsorName = request.json['sponsName']


        if not check_dup_app(db_connection, user, sponsorName):
            query = 'INSERT INTO TruckBux.Applications (username, sponsorName) VALUES(:x, :y)'
            param = {'x': user, 'y': sponsorName}

            try:
                db_connection.execute(text(query), param)
                resp = {'result': 'success'}
            except:
                resp = {'result': 'failure'}
        else:
            resp = {'error': 'duplicate application'}

        return jsonify(resp)
    if request.method == 'GET':
        if 'user' in request.args:
            user = request.args['user']
            acctType = get_acctType(db_connection, user)

            if acctType == 'D':
                query = 'SELECT * FROM TruckBux.Applications where username = :x'
                param = {'x': user}

            elif acctType == 'S':
                sponsName = get_sponsName(db_connection, user)
                query = 'SELECT users.username, users.fName, users.lName, apps.`date`, apps.`status`, apps.sponsorName, apps.applicationID FROM TruckBux.Applications as apps INNER JOIN TruckBux.Users as users ON apps.username = users.username WHERE apps.sponsorName = :x'
                param = {'x': sponsName}

            else:
                query = 'SELECT * FROM TruckBux.Applications'
                param = {}

            apps = []

            if param != {}:
                rows = db_connection.execute(text(query), param).fetchall()
            else:
                rows = db_connection.execute(text(query)).fetchall()

            for row in rows:
                apps.append(dict(row))

            return jsonify({"apps": apps})
    if request.method == 'PATCH':
        username = request.json['user']
        sponsor = request.json['sponsName']
        status = request.json['status']

        if status == 'Approved':
            query = 'DELETE FROM TruckBux.Applications WHERE username = :x AND sponsorName = :y'
            param = {'x': username, 'y': sponsor}
            db_connection.execute(text(query), param)
            query = 'INSERT INTO TruckBux.Sponsorships (username, sponsorName, active) VALUES (:x, :y, 1)'
            param = {'x': username, 'y': sponsor}
        elif status == 'Denied':
            query = "UPDATE TruckBux.Applications SET status = 'Denied', statusReason = 'Denied Application', date = NOW() WHERE username = :x AND sponsorName = :y"
            param = {'x': username, 'y': sponsor}
        elif status == 'Cancelled':
            query = 'DELETE FROM TruckBux.Applications WHERE username = :x AND sponsorName = :y'
            param = {'x': username, 'y': sponsor}

        db_connection.execute(text(query), param)

        return jsonify({"result": "success"})

# @POST inserts new sponsor into database
# @GET
# if given user, if acctType is S returns all users associated with that sponsor
# if acctType is A, returns all users
# if given nothing, returns all Sponsor accounts
# @returns {1: {account1}, 2: {account2}}


@app.route('/sponsors', methods=['POST', 'GET'])
@cross_origin()
def sponsors():
    if request.method == 'POST':
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

    elif request.method == 'GET':

        relatedSponsors = []
        otherSponsors = []

        if 'user' in request.args:
            user = request.args['user']
            acctType = get_acctType(db_connection, user)

            print(acctType)

            if (acctType == 'S'):
                # sponsors will get only other sponsors
                sponsName = get_sponsName(db_connection, user)
                query = 'SELECT * FROM TruckBux.Sponsors'
                param = {'x': sponsName}
                rows = db_connection.execute(text(query), param)
                for row in rows:
                    if row['sponsorName'] == sponsName:
                        relatedSponsors.append(dict(row))
                    else:
                        otherSponsors.append(dict(row))
            elif (acctType == 'A'):
                # admins will get all sponsors
                query = 'SELECT * FROM TruckBux.Sponsors'
                rows = db_connection.execute(text(query))
                for row in rows:
                    otherSponsors.append(dict(row))
            else:
                # get related sponsors
                query = f"SELECT sponsors.* FROM TruckBux.Sponsors AS sponsors INNER JOIN TruckBux.Sponsorships AS sponsorships ON sponsors.sponsorName = sponsorships.sponsorName WHERE sponsorships.username = :x"
                param = {'x': user}
                rows = db_connection.execute(text(query), param).fetchall()
                for row in rows:
                    relatedSponsors.append(dict(row))
                # get other sponsors that are not in applications
                query = f"SELECT * FROM TruckBux.Sponsors WHERE sponsorName NOT IN (SELECT sponsorName FROM TruckBux.Applications WHERE username = :x)"
                param = {'x': user}
                rows = db_connection.execute(text(query), param).fetchall()
                for row in rows:
                    otherSponsors.append(dict(row))

        else:
            query = 'SELECT sponsorName FROM TruckBux.Sponsors'
            rows = db_connection.execute(text(query))
            for row in rows:
                otherSponsors.append(dict(row))

        return jsonify({"relatedSponsors": relatedSponsors, "otherSponsors": otherSponsors})


# Endpoint to insert data into the points table
# @POST request takes in giver, reciever[], points, reason
# reciever must be an array of drivers (strings)
# @returns success or failure
# TO POST TO ALL OF A SPONSORS DRIVERS MAKE recievers[0] = 'all'
#
# @GET request takes in driver and
# @returns total points that driver has for each sponsor {'<sponsorName>': <point_total>}
@app.route('/points', methods=['POST', 'GET'])
@cross_origin()
def points():
    if request.method == 'POST':
        giver = request.json['giver']
        receivers = request.json['receivers']
        point_change = request.json['points']
        reason = request.json['reason']

        # insert points for all of a sponsor's drivers
        if receivers[0] == 'all':
            param = {'x': giver}
            query = 'SELECT username FROM Sponsorships WHERE sponsorName = :x '
            my_data = db_connection.execute(text(query), param).fetchall()
            if my_data != None:
                for row in my_data:
                    notif_log(db_connection, row[0], 'points')
                    query = 'INSERT INTO TruckBux.Points (nameGiver, nameReceiver, pointChange, changeReason) '
                    query += 'values(:x, :y, :j, :k)'
                    param = {'x': giver, 'y': row[0],
                             'j': point_change, 'k': reason}
                    try:
                        db_connection.execute(text(query), param)
                    except:
                        return (jsonify({'result': 'failure'}))
            return (jsonify({'result': 'success'}))

        # insert points for a given list of drivers
        for i in range(0, (len(receivers))):
            notif_log(db_connection, receivers[i], 'points')
            query = 'INSERT INTO TruckBux.Points (nameGiver, nameReceiver, pointChange, changeReason) '
            query += 'values(:x, :y, :j, :k)'
            param = {'x': giver,
                     'y': receivers[i], 'j': point_change, 'k': reason}
            try:
                db_connection.execute(text(query), param)
            except:
                return (jsonify({'result': 'failure'}))
        return (jsonify({'result': 'success'}))

    # get sponsor's points by driver
    elif request.method == 'GET':
        driver = request.args['driver']
        user_items = []
        query = 'SELECT nameGiver, SUM(pointChange) FROM TruckBux.Points WHERE nameReceiver = :x GROUP BY nameGiver;'
        params = {'x': driver}
        rows = db_connection.execute(text(query), params).fetchall()
        for row in rows:
            user_items.append({'sponsorName': row[0], 'points': row[1]})
        return (jsonify(user_items))


# Endpoint to insert items into the a users cart
# @POST request takes in a username and list of Item_ID's and Number of Items
# @returns success or failure
#
# @GET request takes in username and
# @returns all Item_ID's that user currenly has in cart
@app.route('/Cart', methods=['POST', 'GET'])
@cross_origin()
def update_cart():

    if request.method == 'POST':
        user = request.json['user']
        items = request.json['items']
        foo = jsonify({'result': 'didnt finish'})

        # EMPTY OLD CART
        queryDelete = 'DELETE FROM TruckBux.Cart WHERE username = :x'
        paramDelete = {'x': user}
        rowsDelete = db_connection.execute(text(queryDelete), paramDelete)

        # GET DATA FROM LIST
        for i in range(len(items)):
            dataList = [items[i]]
            for index in range(len(dataList)):
                for key in dataList[index]:
                    if key == 'price':
                        cost = dataList[index][key]
                    if key == 'itemId':
                        item = dataList[index][key]
                    if key == 'quantity':
                        num = dataList[index][key]

            # ADD TO CART
            for i in range(num):
                foo = jsonify({'result': 'not yet'})
                query = 'INSERT INTO TruckBux.Cart (username, Item_ID, cost) '
                query += 'values(:x, :y, :z);'
                param = {'x': user, 'y': str(item), 'z': str(cost)}
                try:
                    db_connection.execute(text(query), param)
                    foo = jsonify({'result': 'success'})
                except:
                    foo = jsonify({'result': 'failure'})

        return (foo)

    # GET ALL ITEMS CURRENTLY IN USERS CART
    # IN FORM: [
    #   {itemId: STR, quantity: NUM},
    # ]
    elif request.method == 'GET':
        user = request.args['user']
        user_items = []
        query = 'SELECT Item_ID, COUNT(Item_ID) AS quantity FROM TruckBux.Cart WHERE username = :x  GROUP BY Item_ID;'
        params = {'x': user}
        rows = db_connection.execute(text(query), params).fetchall()
        for row in rows:
            user_items.append({'itemId': row[0], 'quantity': row[1]})
        return (jsonify(user_items))


# helper for purchase, must be in api
def get_new_cost(search):
    print(search)
    if EXPIRES < datetime.datetime.now():
        new_token()
    queryURL = f"https://api.sandbox.ebay.com/buy/browse/v1/item/{search}?"
    print(queryURL)
    header = {
        "Authorization": "Bearer " + EBAY_TOKEN
    }
    resp = requests.get(
        queryURL, headers=header)
    print(resp.json())
    fun = resp.json()
    new_cost = fun['price']['value']
    return (new_cost)

# Endpoint to let a user purchase items
# @POST request takes in a username
# Purchases itemts currently in users cart then removes items from cart
# @returns bought
#
# @GET request takes in username and
# @returns all Item_ID's that user has purchased

# TODO: User who initiates the purchase needs to be logged when sponsor
    # makes purchase on behalf of driver
# Purchases store only monetary amount - do we need to store points?
# Point deductions are being made with monetary amount - not point amount


@app.route('/purchase', methods=['POST', 'GET'])
@cross_origin()
def user_purchase():

    if request.method == 'POST':

        user = request.json['driver']
        sponsor = request.json['sponsor']

        param = {'x': user, 'd': datetime.datetime.now()}
        ps = 'SELECT sum(pointChange) FROM TruckBux.Points where nameReceiver = :x ;'
        pointsum = db_connection.execute(text(ps), param).fetchone()

        # UPDATE PURCHASE COST
        q = 'SELECT Item_ID, cost FROM TruckBux.Cart where username = :x ;'
        costs = db_connection.execute(text(q), param).fetchall()
        for rows in costs:
            itemid = rows[0]
            if len(str(itemid)) > 5:
                new_cost = get_new_cost(itemid)
                param2 = {'n': new_cost, 's': itemid}
                if rows[1] != new_cost:
                    q2 = 'UPDATE TruckBux.Cart SET cost = :n WHERE Item_ID = :s ;'
                    db_connection.execute(text(q2), param2)

        cs = 'SELECT sum(cost) FROM TruckBux.Cart where username = :x ;'
        cartsum = db_connection.execute(text(cs), param).fetchone()

        # NEITHER Can be null
        if pointsum[0] < cartsum[0]:
            return (jsonify({'result': 'You do not have enough points.'}))

        param = {'x': user, 'd': datetime.datetime.now(), 'p': (
            0-cartsum[0]), 'o': sponsor, 'r': 'Purchase'}
        query = 'UPDATE TruckBux.Cart SET Date_Time = :d WHERE username = :x ;'
        query2 = 'INSERT INTO TruckBux.Purchases SELECT * FROM TruckBux.Cart WHERE username = :x ;'
        query3 = 'DELETE FROM TruckBux.Cart WHERE username = :x ;'
        query4 = 'INSERT INTO TruckBux.Points (nameGiver, nameReceiver, pointChange, changeReason) VALUES(:o, :x, :p, :r);'

        db_connection.execute(text(query), param)
        db_connection.execute(text(query2), param)
        db_connection.execute(text(query3), param)
        db_connection.execute(text(query4), param)
        return (jsonify({'result': 'Bought'}))

    elif request.method == 'GET':
        user = request.args['user']
        user_items = []
        query = 'SELECT * FROM TruckBux.Purchases where username = :x'
        params = {'x': user}
        rows = db_connection.execute(text(query), params).fetchall()
        for row in rows:
            user_items.append(dict(row))
        return (jsonify(user_items))


# Endpoint to show user notifications
# @POST request takes in a username
# @returns all notifications that have not yet been seen then sets them to seen
#
# @GET request takes in username and
# @returns all previous Notifications of that user
@app.route('/notifications', methods=['POST', 'GET'])
@cross_origin()
def notif():

    # Query 2 may need to be it's own call. Issues with React rendering.
    if request.method == 'POST':
        user = request.json['user']
        query = 'SELECT message, dateCreated FROM TruckBux.Notifications WHERE username = :x AND seen = 0'
        #query2 = 'UPDATE Notifications SET seen = 0 WHERE username = :x AND seen = 1;'
        param = {'x': user, }
        rows = db_connection.execute(text(query), param).fetchall()
        #db_connection.execute(text(query2), param)

        unseenNotifications = []
        i = 0
        for row in rows:
            i += 1
            unseenNotifications.append({'message': row[0], 'date': row[1]})

        return (jsonify(unseenNotifications))

    elif request.method == 'GET':
        user = request.args['user']
        messages = []
        query = 'SELECT message, dateCreated FROM TruckBux.Notifications where username = :x'
        params = {'x': user}
        rows = db_connection.execute(text(query), params).fetchall()
        return (jsonify(str(rows)))


# Endpoint to retrieve logs with a given filter
# @param {filter: (<field>: <value>)}
# @returns [{<log_row1>}, {log_row2}]
@app.route('/logs', methods=['GET'])
@cross_origin()
def log_filter():
    query = 'SELECT * FROM TruckBux.Logging'
    params = {}
    if len(request.args) > 0:
        numFiltersAdded = 0
        query += ' WHERE'
        if 'username' in request.args and request.args.get('username') != '':
            query += ' username = :x'
            params['x'] = request.args.get('username')
            numFiltersAdded += 1
        if 'log_type' in request.args:
            if numFiltersAdded > 0:
                query += ' AND'
            query += ' log_type = :y'
            params['y'] = request.args.get('log_type')
            numFiltersAdded += 1
        if 'modder' in request.args:
            if numFiltersAdded > 0:
                query += ' AND'
            query += ' modder = :z'
            params['z'] = request.args.get('modder')
            numFiltersAdded += 1
        if 'start_date' in request.args:
            if numFiltersAdded > 0:
                query += ' AND'
            query += ' date_time >= :a'
            params['a'] = request.args.get('start_date')
            numFiltersAdded += 1
        if 'end_date' in request.args:
            if numFiltersAdded > 0:
                query += ' AND'
            query += ' date_time <= :b'
            params['b'] = request.args.get('end_date')
            numFiltersAdded += 1

    rows = db_connection.execute(text(query), params).fetchall()

    data = []
    for row in rows:
        data.append(dict(row))

    return (jsonify({'number': len(data), 'logs': data}))

# Endpoint to retrieve drivers based on requesting user


@app.route('/users', methods=['GET'])
@cross_origin()
def drivers_request():
    user = request.args['user']
    acctType = get_acctType(db_connection, user)

    params = {}
    if acctType == 'D':
        query = 'SELECT username, email, fname, lname, bio, acctType FROM TruckBux.Users WHERE username = :x'
        params['x'] = request.args.get('user')
        rows = db_connection.execute(text(query), params).fetchall()
    elif acctType == 'S':
        sponsName = get_sponsName(db_connection, user)
        query = f'SELECT users.username, users.email, users.fname, users.lname, users.bio, users.acctType FROM TruckBux.Users AS users INNER JOIN TruckBux.Sponsorships AS sponsorships ON users.username = sponsorships.username WHERE sponsorships.sponsorName = "{sponsName}" AND sponsorships.active = "1" AND users.active = "1"'
        rows = db_connection.execute(text(query)).fetchall()
    else:
        query = 'SELECT username, email, fname, lname, bio, active, dateCreated, acctType FROM TruckBux.Users'
        rows = db_connection.execute(text(query)).fetchall()

    drivers = []
    sponsors = []
    admins = []

    for row in rows:
        if row['acctType'] == 'D':
            drivers.append(dict(row))
        elif row['acctType'] == 'S':
            sponsors.append(dict(row))
        else:
            admins.append(dict(row))

    return (jsonify({"admins": admins, "sponsors": sponsors,  "drivers": drivers}))


@app.route('/sponsorships', methods=['POST'])
@cross_origin()
def sponsorships_request():
    user = request.json['user']
    sponsor = request.json['sponsor']

    if sponsor == '':
        return (jsonify({"status": "fail", "error": "Cannot add sponsorship to empty sponsor!"}))

    acctType = get_acctType(db_connection, user)

    query = 'SELECT * FROM TruckBux.Sponsorships WHERE username = :x AND sponsorName = :y'
    params = {'x': user, 'y': sponsor}

    rows = db_connection.execute(text(query), params).fetchall()

    if len(rows) == 0:
        query = 'INSERT INTO TruckBux.Sponsorships (username, sponsorName, active) VALUES ( :x, :y, :z)'
        params = {'x': user, 'y': sponsor, 'z': 1}

        db_connection.execute(text(query), params)

        return (jsonify({"status": "success"}))
    else:
        return (jsonify({"status": "fail", "error": "Sponsorship already exists!"}))


@app.route('/conversionrate', methods=['POST'])
@cross_origin()
def change_conversion_rate_request():
    user = request.json['user']
    target = request.json['target']
    newRate = request.json['rate']

    userType = get_acctType(db_connection, user)
    targetType = get_acctType(db_connection, target)

    if(targetType != 'S'):
        return jsonify({'error': 'Target user is not a sponsor.'})

    if(userType == 'A' or (userType == 'S' and check_sponsorship(db_connection, user, target))):
        query = 'UPDATE TruckBux.Sponsors SET pointConversionRate = :rate WHERE sponsorName = :target'
        param = {'target': target, 'rate': newRate}

        db_connection.execute(text(query), param)
        return jsonify({'result': 'Points successfully changed.'})
    else:
        return jsonify({'error': 'Your account lacks privilege.'})

@app.route('/pointsrecurring', methods=['POST'])
@cross_origin()
def recurring_plans():
    user = request.json['user']
    targets = request.json['targets']
    point_amount = request.json['points']

    # Ensure only main
    sponsor_org = get_main_sponsor_org(db_connection, user)
    date = datetime.datetime.now()

    if(sponsor_org):
        sponsor_org = sponsor_org[0]
        for target in targets:
            delete_existing_recurring(db_connection, target, sponsor_org)
            query = 'INSERT INTO TruckBux.RecurringPoints (sponsorName, username, points, startDate) VALUES (:org, :target, :points, :date)'
            param = {'org': sponsor_org, 'target': target, 'points': point_amount, 'date': date}

            result = db_connection.execute(text(query), param)

        if(result):
            return jsonify({ 'Result': 'Recurring plan created.' })
        else:
            return jsonify({ 'Result': 'There was a problem making your plan.' })
    else:
        return jsonify({ 'Result': 'Your account lacks this privilege.' })


@app.route('/reports', methods=['GET'])
@cross_origin()
def reports():
    if EXPIRES < datetime.datetime.now():
        new_token()

    if request.args['report'] == 'top-products':
        query = 'SELECT Item_ID, COUNT(*) FROM TruckBux.Purchases GROUP BY Item_ID ORDER BY COUNT(*) DESC LIMIT 10'
        rows = db_connection.execute(query).fetchall()
         
        # build lists with itemIDs and number of purchases from DB
        items, counts = [], []
        for row in rows:
            if row[0][0] == 'v':
                items.append(row[0])
                counts.append(row[1])

        queryURL = f"https://api.sandbox.ebay.com/buy/browse/v1/item/"
        header = {
            "Authorization": "Bearer " + EBAY_TOKEN
        } 
        # Convert itemID into item title through ebay api call  
        for i in range(len(items)):
            url_call = queryURL + items[i] + '?'
            resp = requests.get(
                url_call, headers=header)
            
            if not 'errors' in json.loads(resp.content):
                items[i] = json.loads(resp.content)['title'][:15] + '...'

        # Build bar chart
        fig, ax = plt.subplots()
        x_ax = [i for i in range(len(items))]
        ax.set_ylabel('Number of Purchases')
        ax.set_title('Top 10 purchased products')
        ten_labels = ['red', 'blue', 'orange', 'olive', 'gray', 'green', 'purple', 'pink', 'brown', 'cyan']
        ten_colors = ['tab:red', 'tab:blue', 'tab:orange', 'tab:olive', 'tab:gray', 'tab:green', 'tab:purple', 'tab:pink', 'tab:brown', 'tab:cyan']
        used_labels = ten_labels[:len(items)]
        used_colors = ten_colors[:len(items)]

        ax.bar(x_ax, counts, label=used_labels, color=used_colors)
        ax.legend(labels=items, loc='best')

        # send chart back in response
        graph = io.BytesIO()
        plt.savefig(graph, format='png')
        encoded_img = base64.encodebytes(graph.getvalue()).decode('ascii')
        return(jsonify({'graph': encoded_img}))
    else:
        pass


if __name__ == '__main__':
    app.run(debug=True)
