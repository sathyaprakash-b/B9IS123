__auther__ = 'Ashish Patil'

from flask import Flask,request,jsonify
from mysql import connector
import mysql
import json

def insertActor():

    first_name = request.args.get('first_name')
    last_name = request.args.get('last_name')
    gender = request.args.get('gender')
    checkPresent = request.args.get('checkPresent')

    con = mysql.connector.connect(
        host='localhost',
        user='root',
        password='Stacker#123',
        database='IMDB'
    )
    cursor = con.cursor()
    cursor.execute("select current_value from counter where name = 'actors'")
    primary_key = cursor.fetchall()[0][0]
    cursor.close()

    cursor = con.cursor()
    cursor.execute("select * from actors where first_name = %s and last_name = %s", (first_name, last_name))
    actor_data = cursor.fetchall();
    cursor.close()

    if (checkPresent == 'True' and len(actor_data) == 1):
        return "1"
    elif (checkPresent == 'True' and len(actor_data) != 1):
        return "0"

    if len(actor_data) != 0:
        return "0"

    cursor = con.cursor()
    cursor.execute("insert into actors(id,first_name,last_name,gender) "
                   "values(%s,%s,%s,%s)", (primary_key, first_name, last_name, gender,))
    con.commit()
    cursor.close()

    cursor = con.cursor()
    cursor.execute("update counter set current_value = %s where name = 'actors'",(primary_key+1,))
    con.commit()
    cursor.close()

    return "1"

def insertDirector():

    first_name = request.args.get('first_name')
    last_name = request.args.get('last_name')
    checkPresent = request.args.get('checkPresent')

    con = mysql.connector.connect(
        host='localhost',
        user='root',
        password='Stacker#123',
        database='IMDB'
    )

    cursor = con.cursor()
    cursor.execute("select current_value from counter where name = 'directors'")
    primary_key = cursor.fetchall()[0][0]
    cursor.close()

    cursor = con.cursor()
    cursor.execute("select * from directors where first_name = %s and last_name = %s", (first_name, last_name))
    director_data = cursor.fetchall();
    cursor.close()

    if(checkPresent == 'True' and len(director_data) == 1):
        return "1"
    elif(checkPresent == 'True' and len(director_data) != 1):
        return "0"

    if len(director_data) != 0:
        return "0"

    cursor = con.cursor()
    cursor.execute("insert into directors(id,first_name,last_name) "
                   "values(%s,%s,%s)", (primary_key, first_name, last_name,))
    con.commit()
    cursor.close()

    cursor = con.cursor()
    cursor.execute("update counter set current_value = %s where name = 'directors'", (primary_key + 1,))
    con.commit()
    cursor.close()

    return "1"



