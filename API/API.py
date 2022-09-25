import json
from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine, text
  
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
# @return 'username taken' | 'username valid' in result field
@app.route('/checkuser', methods=['POST'])
@cross_origin()
def check_username():
    print('entered')
    username = f"'{request.json['user']}'"

    qresult = db_connection.execute(text(f'select * from Users where username = {username}'))

    if(qresult.one_or_none() != None):
        return jsonify({'result': 'username taken'})
    else:
        return jsonify({'result': 'username not taken'})

app.run(debug=True)