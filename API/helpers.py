from sqlalchemy import text
from sre_parse import SPECIAL_CHARS
import requests
import datetime
import json
import bcrypt
import re


# ======================= DATA CHECKS ================================================

# Function that takes a username
# and checks that the username is already present in the database
# @return bools False if taken | True if not taken in result field
def check_username(db_connection, username):
    # Parameterized queries protect against sqli
    query = text('select * from Users where username = :x')
    param = {'x': username}

    qresult = db_connection.execute(query, param)

    if (qresult.one_or_none() != None):
        return False
    else:
        return True


# Checks that password complexity requirements are met
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


# Checks that email is a valid email format
def check_email(email):
    if re.match(".+@.+\....", email) == None:
        return False
    else:
        return True


def check_sponsor_name(db_connection, name):
    # Parameterized queries protect against sqli
    query = text('select * from Sponsors where sponsorName = :x')
    param = {'x': name}

    qresult = db_connection.execute(query, param)

    if (qresult.one_or_none() != None):
        return False
    else:
        return True


def check_dup_app(db_connection, user, sponsID):
    dup = False
    query = 'SELECT username, sponsorID from TruckBux.Applications WHERE username = :x'
    param = {'x': user}

    data = db_connection.execute(text(query), param)
    for row in data.fetchall():
        if row['sponsorID'] == sponsID:
            dup = True

    return dup


# ======================= GETTERS =========================================================

# gets sponsor name from sponsID
def get_spons_name(db_connection, id):
    query = 'SELECT * FROM TruckBux.Sponsors WHERE sponsorID = :x'
    param = {'x': id}

    row = db_connection.execute(text(query), param).fetchone()
    return row['sponsorName']


# gets sponsorID from sponsName
def get_spons_id(db_connection, name):
    query = 'SELECT * FROM TruckBux.Sponsors WHERE sponsorName = :x'
    param = {'x': name}

    rows = db_connection.execute(text(query), param).fetchone()
    return rows['sponsorID']

# gets acctType from username
def get_acctType(db_connection, name):
    query = 'SELECT * FROM TruckBux.Users WHERE username = :x'
    param = {'x': name}

    rows = db_connection.execute(text(query), param).fetchone()
    return rows['acctType']


# Function that takes a cleartext password and returns
# a bcrypt hash of that password
# @return bytestring salted bcrypt hash
def hash_password(password):
    hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    return hash


#Helper Funtion to add years to a datetime
def add_years(start_date, years):
    try:
        return start_date.replace(year=start_date.year + years)
    except ValueError:
        return start_date.replace(year=start_date.year + years, day=28)


# =============================================== LOGGING ===========================================

# Function to insert record of login instance into loginLog Table
# Username must be valid
# Returns bool True or False
def log(db_connection, username, logresult):
    if check_username(db_connection, username) == False:
        query = text(
            "INSERT INTO TruckBux.loginLog (username, date_time, result) VALUES(:x, :d, :n)")
        param = {'x': username, 'n': logresult, 'd': datetime.datetime.now()}
        db_connection.execute(query, param)
        return True
    else:
        return False

    
def log_pass_change(db_connection, modder, user, reason=None):
    change_type = 'password reset'

    if reason == None:
        query = 'INSERT INTO TruckBux.AccountModifications (modderName, username, type) VALUES(:x, :y, :z)'
        param = {'x': modder, 'y': user, 'z': change_type}
    else:
        query = 'INSERT INTO TruckBux.AccountModifications (modderName, username, type, modReason) VALUES(:x, :y, :z, :j)'
        param = {'x': modder, 'y': user, 'z': change_type, 'j': reason}

    try:
        db_connection.execute(text(query), param)
    except:
        print("Could not log password reset")


# ========================================= ACCOUNT LOCKOUT =============================================

#Function to Lock Account based on username and number of years to lock
def lock_account(db_connection, username, years):
    date_1 = datetime.datetime.now()
    date_2 = add_years(date_1, years)
    if check_username(username) == False:
        query = 'UPDATE TruckBux.Users SET lockedUntil = :u WHERE username = :x'
        param = {'x': username, 'u': date_2}
        db_connection.execute(text(query), param)
        return True
    else:
        return False


# Function to Unlock Account based on username
def unlock_account(db_connection, username):
    if check_username(username) == False:
        query = 'UPDATE TruckBux.Users SET lockedUntil = NULL WHERE username = :x'
        param = {'x': username}
        db_connection.execute(text(query), param)
        return True
    else:
        return False