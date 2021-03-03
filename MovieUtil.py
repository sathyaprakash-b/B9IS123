__auther__ = 'Ashish Patil'

def validateLenght(record):
    #this function checks number of records from the query result
    #if number of records greater than one or zero then return false
    #if number of records equals to one then returns true
    if(len(record) == 1):
        return True
    return False

def validateNumberOfMoviesForDirectorOrActor(n):
    if n>0:
        return True
    return False
