import re
from sre_parse import SPECIAL_CHARS
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine, text


# DEFINE THE DATABASE CREDENTIALS
DBUSER = 'admin'
DBPASSWORD = 'ChaseNathanManningNick27$'
DBHOST = 'team-27.cobd8enwsupz.us-east-1.rds.amazonaws.com'
DBPORT = 3306
DB = 'TruckBux'

PASS_COMP_REQS = 'Password must contain 8 characters, 1 uppercase, and 1 special character'


app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])


# PYTHON FUNCTION TO CONNECT TO THE MYSQL DATABASE AND
# RETURN THE SQLACHEMY ENGINE OBJECT
def get_connection():
    return create_engine(
        url="mysql+pymysql://{0}:{1}@{2}:{3}/{4}".format(
            DBUSER, DBPASSWORD, DBHOST, DBPORT, DB
        )
    )
db_connection = get_connection()



# Function that takes a username
# and checks that the username is already present in the database
# @return bools False if taken | True if not taken in result field
def check_username(username):
    # Parameterized queries protect against sqli
    query = text('select * from Users where username = :x')
    param = {'x':username}
    
    qresult = db_connection.execute(query, param)

    if(qresult.one_or_none() != None):
        return False
    else:
        return True


def check_password(password):
    good_len = True
    has_cap = False
    has_spec = False
    if len(password) < 8:
        good_len = False
    
    for letter in password:
        if letter.isupper():
            has_cap = True
        if letter in SPECIAL_CHARS:
            has_spec = True
    
    if good_len and has_spec and has_cap:
        return True
    else:
        return False


def check_email(email):
    if re.match(".+@.+\....", email) == None:
        return False
    else:
        return True


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

    resp = {'error':'False'}

    # Check for valid data
    if check_username(username) == False:
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
            #Insert record into Database
            query = text("INSERT INTO TruckBux.Users(username, password, email, fName, lName) VALUES(:x, :y, :z, :j, :k)")
            param = {'x': username, 'y':password, 'z':email, 'j':fname, 'k':lname}
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
    # Parameterized queries protect against sqli
    param = {'x':request.json['user'], 'y':request.json['pass']}
    query = text('select * from Users where username = :x AND password = :y')
   
    qresult = db_connection.execute(query, param)
    
    if(qresult.one_or_none() != None):
       return(jsonify({'result': 'True'}))
    else:
       return(jsonify({'result': 'False'}))


app.run(debug=True)