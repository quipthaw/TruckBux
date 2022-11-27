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
    result = True
    # Parameterized queries protect against sqli
    query = text('select sponsorName from Sponsors')
    param = {'x': name}

    rows = db_connection.execute(query, param).fetchall()

    for row in rows:
        if name.upper() == row[0].upper():
            result = False

    return result


def check_dup_app(db_connection, user, sponsorName):
    dup = False
    query = 'SELECT username, sponsorName from TruckBux.Applications WHERE username = :x'
    param = {'x': user}

    data = db_connection.execute(text(query), param)
    for row in data.fetchall():
        if row['sponsorName'] == sponsorName:
            dup = True

    return dup


# ======================= GETTERS =========================================================

# gets acctType from username
def get_acctType(db_connection, name):
    query = 'SELECT * FROM TruckBux.Users WHERE username = :x'
    param = {'x': name}

    rows = db_connection.execute(text(query), param).fetchone()
    return rows['acctType']

# get the name of the sponsor organization attached to the sponsor account


def get_sponsName(db_connection, user):
    query = "SELECT a.username, b.sponsorName FROM TruckBux.Users AS a INNER JOIN TruckBux.Sponsorships AS b ON a.username = b.username WHERE a.username = :x"
    param = {'x': user}

    rows = db_connection.execute(text(query), param).fetchone()
    return rows['sponsorName']


# Function that takes a cleartext password and returns
# a bcrypt hash of that password
# @return bytestring salted bcrypt hash
def hash_password(password):
    hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    return hash


# Helper Funtion to add years to a datetime
def add_years(start_date, years):
    try:
        return start_date.replace(year=start_date.year + years)
    except ValueError:
        return start_date.replace(year=start_date.year + years, day=28)

#Helper Function to Update ALL User Points
def update_points(db_connection, point_change):
    query = 'SET SQL_SAFE_UPDATES = 0; CALL UpdatePoints(:x);'
    param = {'x': point_change}
    result = db_connection.execute(text(query), param).fetchall()
    return result


# =============================================== LOGGING ===========================================

# Function to insert record of login instance into loginLog Table
# Username must be valid
# Returns bool True or False
def log(db_connection, username, log_type, logresult=None, modder=None, reason=None):
    if modder == None:
        modder = 'N/A'
    if reason == None:
        reason = 'default log'
    if logresult == None:
        logresult = 'N/A'

    query = 'INSERT INTO TruckBux.Logging (username, log_type, result, mod_reason, modder) '
    query += 'VALUES(:x, :y, :j, :k, :l)'
    param = {'x': username, 'y': log_type,
             'j': logresult, 'k': reason, 'l': modder}

    try:
        db_connection.execute(text(query), param)
    except:
        print("failed to store log")


# Helper to store notification
def notif_log(db_connection, username, message):
    query = 'INSERT INTO TruckBux.Notifications (username, message, seen) '
    query += 'VALUES(:x, :y, :j)'
    param = {'x': username, 'y': message, 'j': 0}
    try:
        db_connection.execute(text(query), param)
    except:
        print("failed to store notif log")


# ========================================= ACCOUNT LOCKOUT =============================================

# Function to Lock Account based on username and number of years to lock
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


# Function to check if user is part of sponsor organization
def check_sponsorship(db_connection, user, organization):

    query = 'SELECT * FROM TruckBux.Sponsorships WHERE username = :user AND sponsorName = :organization'
    param = {'user': user, 'organization': organization}
    
    result = db_connection.execute(text(query), param)

    if (result.one_or_none() != None):
        return True
    else:
        return False

def get_main_sponsor_org(db_connection, user):

    query = 'SELECT sponsorName FROM TruckBux.Sponsorships WHERE username = :user'
    param = {'user': user}

    result = db_connection.execute(text(query), param).fetchone()

    return result

def delete_existing_recurring(db_connection, user, organization):
    query = 'DELETE FROM TruckBux.RecurringPoints WHERE sponsorName = :org AND username = :user'
    param = {'user': user, 'org': organization}

    db_connection.execute(text(query), param)