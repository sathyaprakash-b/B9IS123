__auther__ = 'Ashish Patil'

from flask import Flask, request, jsonify
from mysql import connector
import mysql
import json
import MovieUtil

def mainPageMoviesAPI():

    con = mysql.connector.connect(
        host='localhost',
        user='root',
        password='Stacker#123',
        database='IMDB'
    )

    cursor = con.cursor()
    cursor.execute("DROP VIEW `imdb`.`moviesSortedByYear`")
    cursor.close()


    cursor = con.cursor()
    cursor.execute("create view moviesSortedByYear as "
                   "select * from movies m where m.rankscore is not NULL order by m.year desc limit 5;")
    cursor.close()

    cursor = con.cursor()
    cursor.execute("select * from moviesSortedByYear order by rankscore desc")
    mainPageMovieData = cursor.fetchall()
    cursor.close()

    mainPageMovieDataDict = jsonForMainPageMovieData(mainPageMovieData)
    mainPageMovieDataDict = json.dumps(mainPageMovieDataDict)

    return mainPageMovieDataDict

def jsonForMainPageMovieData(mainPageMovieData):
  movie_dict = {}
  movie_list = []
  year_list = []
  ranking_list = []
  for val in mainPageMovieData:
    movie_list.append(val[1])
    year_list.append(val[2])
    ranking_list.append(val[3])
  movie_dict['Movie_Names'] = movie_list
  movie_dict['Movie_Year'] = year_list
  movie_dict['Ratings'] = ranking_list
  return movie_dict
