__auther__ = 'Ashish Patil'

def validateLenght(record):
    #this function checks number of records from the query result
    #if number of records greater than one or zero then return false
    #if number of records equals to one then returns true
    if(len(record) == 1):
        return True
    return False

def validateNumberOfMoviesForDirector(n):
    if n>0:
        return True
    return False


def fillSearchDirectorAPI(first_name,last_name,number_of_movies,movie_data):
  SearchDirector_Dict = {}
  movie_dict = {}
  movie_list = []
  year_list = []
  SearchDirector_Dict['Director_First_Name'] = first_name
  SearchDirector_Dict['Director_Last_Name'] = last_name
  SearchDirector_Dict['Number_Of_Movies'] = number_of_movies
  for i , val in enumerate(movie_data):
    movie_list.append(val[1])
    year_list.append(val[2])
  movie_dict['Movie_Names'] = movie_list
  movie_dict['Release_Years'] = year_list
  SearchDirector_Dict['Top_5_Movies'] = movie_dict
  return SearchDirector_Dict
