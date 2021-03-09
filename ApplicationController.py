__auther__ = 'Ashish Patil'

from flask import Flask,request,jsonify
from mysql import connector
import mysql
import json
import searchDirectorAPI
import searchActorAPI
import searchMovieAPI
import mainPageTechnical
import searchBasedOnGenres

app = Flask(__name__)

@app.route('/searchDirector')
def searchDirectorController():
    return searchDirectorAPI.searchDirectorAPI()

@app.route('/searchActor')
def searchActorController():
    return searchActorAPI.searchActorAPI()

@app.route('/searchMovie')
def searchMovieController():
    return searchMovieAPI.searchMovieAPI()

@app.route('/mainPageMovies')
def mainPageMoviesController():
    return mainPageTechnical.mainPageMoviesAPI();

@app.route('/getAllGenres')
def getAllGenres():
    return searchBasedOnGenres.getGenres();

@app.route('/getMovieBasedonGenre')
def getMoviesBasedOnGenre():
    return searchBasedOnGenres.getMovies()

if __name__ == "__main__":
    app.run()