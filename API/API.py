import json
from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine, text, insert
  
# DEFINE THE DATABASE CREDENTIALS
user = 'admin'
password = 'ChaseNathanManningNick27$'
host = 'team-27.cobd8enwsupz.us-east-1.rds.amazonaws.com'
port = 3306
database = 'TruckBux'

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])


# PYTHON FUNCTION TO CONNECT TO THE MYSQL DATABASE AND
# RETURN THE SQLACHEMY ENGINE OBJECT
def get_connection():
    return create_engine(
        url="mysql+pymysql://{0}:{1}@{2}:{3}/{4}".format(
            user, password, host, port, database
        )
    )
db_connection = get_connection()


# Endpoint that takes a username via post request in from {'user': <username>}
# and checks that the username is already present in the database
# @return 'False' if taken | 'True' if not taken in result field
@app.route('/checkuser', methods=['POST'])
@cross_origin()
def check_username():
    # Parameterized queries protect against sqli
    query = text('select * from Users where username = :x')
    param = {'x':request.json['user']}
    
    qresult = db_connection.execute(query, param)

    if(qresult.one_or_none() != None):
        return jsonify({'result': 'False'})
    else:
        return jsonify({'result': 'True'})


# Endpoint that takes a password and username via post request in from {'user': <username>, 'pass': <password>}
# and checks that the username and password exist together
# @return 'True' | 'False' in result field
@app.route('/checkpassword', methods=['POST'])
#@cross_origin  -  Will not execute if uncommented. 
def check_password():
    # Parameterized queries protect against sqli
    param = {'x':request.json['user'], 'y':request.json['pass']}
    query = text('select * from Users where username = :x AND password = :y')
   
    qresult = db_connection.execute(query, param)
    
    if(qresult.one_or_none() != None):
       return(jsonify({'result': 'True'}))
    else:
       return(jsonify({'result': 'False'}))




# Endpoint that INSERTS user info via post request in form {'user': <username>, 'passwd': <password>, ...}
# @return 'Insert Succeeded' | 'Insert Failed' in result field
@app.route('/insertusers', methods=['POST'])
def insert_users():
    _user = request.json['insert_user']
    _passwd = request.json['insert_passwd']
    _email = request.json['insert_email']
    _firstname = request.json['insert_firstname']
    _lastname = request.json['insert_lastname']

    #Insert record into Database
    query = text("INSERT INTO TruckBux.Users(username, password, email, fName, lName) VALUES(:x, :y, :z, :j, :k)")
    param = {'x': _user, 'y':_passwd, 'z':_email, 'j':_firstname, 'k':_lastname}
    db_connection.execute(query, param)
    res = jsonify('success')
    res.status_code = 200
    return res

app.run(debug=True)