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
CORS(app, origins=['http://localhost:5000','http://localhost:3000'])


# PYTHON FUNCTION TO CONNECT TO THE MYSQL DATABASE AND
# RETURN THE SQLACHEMY ENGINE OBJECT
def get_connection():
    return create_engine(
        url="mysql+pymysql://{0}:{1}@{2}:{3}/{4}".format(
            user, password, host, port, database
        )
    )
db_connection = get_connection()


#BASIC HOME PAGE
@app.route('/')
def home_page():
   try:
       res = "<h1 style='position: fixed; top: 50%;  left: 50%; transform: translate(-50%, -50%);text-align:center'>FLASK API HOME<p>If you are seeing this page, Good Job. Your Flask app is ready! Add your endpoints.</p></h1>"
       return res
   except Exception as e:
       print(e)


# Endpoint that takes a username via post request in from {'user': <username>}
# and checks that the username is already present in the database
# @return 'Username Taken' | 'Username Not Taken' in result field
@app.route('/checkuser', methods=['POST'])
@cross_origin()
def check_username():
    print('entered')
    username = f"'{request.json['user']}'"

    qresult = db_connection.execute(text(f'select * from Users where username = {username}'))

    if(qresult.one_or_none() != None):
        return jsonify({'result': 'FALSE'})
    else:
        return jsonify({'result': 'TRUE'})




# Endpoint that takes a password and username via post request in from {'user': <username>}
# and checks that the username and password exist together
# @return 'Valid Login' | 'Invalid Login' in result field
@app.route('/checkpassword', methods=['POST'])
#@cross_origin  -  Will not execute if uncommented. 
def check_password():
    print('entered')
    _username = f"'{request.json['usr']}'"
    _password = f"'{request.json['pwd']}'"

    qresult = db_connection.execute(text(f'select * from Users where username = {_username} AND password = {_password}'))
    
    if(qresult.one_or_none() != None):
       return(jsonify({'results': 'Valid Login'}))
    else:
       return(jsonify({'results': 'Invalid Login'}))




# Endpoint that INSERTS user info via post request in form {'user': <username>, 'passwd': <password>, ...}
# @return 'Insert Succeeded' | 'Insert Failed' in result field
@app.route('/insertusers', methods=['POST'])
def insert_users():

    _form = request.form
    _user = _form['insert_user']
    _passwd = _form['insert_passwd']
    _email = _form['insert_email']
    _firstname = _form['insert_firstname']
    _lastname = _form['insert_lastname']

    #should insert:    
    #db_connection.execute(text(f"INSERT INTO TruckBux.Users(username, password, email, fName, lName, active) VALUES('mcgraha', 'passwd', 'manning@clemson.com', 'manning', 'graham', '1')"))


    #Insert record into Database
    conn = db_connection
    cursor = conn.cursor()
    cursor.execute(
        text(f"INSERT INTO TruckBux.Users(username, password, email, fName, lName) VALUES({_user}, {_passwd}, {_email}, {_firstname}, {_lastname})"))
    conn.commit()
    cursor.close()
    conn.close()
    res = jsonify('success')
    res.status_code = 200
    return res

app.run(debug=True)