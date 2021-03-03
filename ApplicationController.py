__auther__ = 'Ashish Patil'

from flask import Flask,request,jsonify
from mysql import connector
import mysql
import json
import searchDirectorAPI
import searchActorAPI

app = Flask(__name__)

@app.route('/searchDirector')
def searchDirectorController():
    return searchDirectorAPI.searchDirectorAPI()

@app.route('/searchActor')
def searchActorController():
    return searchActorAPI.searchActorAPI()

if __name__ == "__main__":
    app.run()