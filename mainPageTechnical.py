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

    mainPageMovieData = data_preprocessing(mainPageMovieData)

    mainPageMovieDataDict = jsonForMainPageMovieData(mainPageMovieData)
    mainPageMovieDataDict = json.dumps(mainPageMovieDataDict)

    return mainPageMovieDataDict

def jsonForMainPageMovieData(mainPageMovieData):
  listForEachMovie = []
  main_dict = {}
  for val in mainPageMovieData:
    movie_dict = {}
    movie_dict['movie_name'] = val[1]
    movie_dict['movie_year'] = str(val[2])
    movie_dict['rating'] = str(val[3])
    listForEachMovie.append(movie_dict)
  main_dict['index_movies'] = listForEachMovie
  return main_dict


def data_preprocessing(mainPageMovieData):
  updated_mainPageMovieData  = []

  for each_record in mainPageMovieData:
    rating = each_record[3]
    if(int(each_record[3]) == 0):
      rating = "NA"
    movie_id = each_record[0]
    movie_name = each_record[1]
    movie_year = each_record[2]
    t = (movie_id,movie_name,movie_year,rating)
    updated_mainPageMovieData.append(t)
  return updated_mainPageMovieData
