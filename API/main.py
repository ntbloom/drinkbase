#!/usr/bin/python3
''' api.py - python/flask script for running drinkBase back end'''

from store.pgStore import DrinkBase
from flask import Flask, request, make_response, jsonify

ds = DrinkBase('drinkbase')
app = Flask(__name__)


''' 
Version 1.0 - first attempt at the API

Methods:
    ingreds()
        -queries the database by ingredient
        -returns full data set with each call
    names()
        -queries the database by name
        -returns full data set with each call
'''

@app.route('/api/v1.0/ingreds/', methods=['GET'])
def ingreds():
    '''querying the database by ingredient'''
    incl = request.args.get('incl')
    excl = request.args.get('excl')
    drinks = ds.allDrinks
    if incl:
        incl = incl.split(', ')
        for i in incl:
            tempSet = set(ds.ingSearch(i))
            drinks = drinks & tempSet
    if excl:
        excl = excl.split(', ')
        for i in excl:
            tempSet = set(ds.ingSearch(i))
            drinks = drinks - tempSet
    drinks = sorted(list(drinks))
    drinks = ds.sendRecipe(drinks)

    return drinks

@app.route('/api/v1.0/names/', methods=['GET'])
def names():
    '''querying the database by drink name'''
    name = request.args.get('name')
    drinks = ds.nameSearch(name)
    drinks = ds.sendRecipe(drinks)
    return drinks


'''
Version 1.1 - second iteration of API
    -sends full dataset at the outset
    -limits data transfer on each API call
    -simpler queries can ultimately be replaced by front-end

Methods:
    allDrinks()
        -sends entire SQL database as single JSON object
    ingred()
        -sends simple list of drinks w/ matching ingredients
    name()
        -sends simple list of drinks matching name regex


'''


@app.route('/api/v1.1/allDrinks/', methods=['GET'])
def allDrinks():
    '''sends entire database as JSON'''
    drinks = ds.allDrinks
    drinkJSON = ds.sendRecipe(drinks)
    return drinkJSON

@app.route('/api/v1.1/ingreds/', methods=['GET'])
def ingred():
    '''querying the database by ingredient'''
    incl = request.args.get('incl')
    excl = request.args.get('excl')
    drinks = ds.allDrinks
    if incl:
        incl = incl.split(', ')
        for i in incl:
            tempSet = set(ds.ingSearch(i))
            drinks = drinks & tempSet
    if excl:
        excl = excl.split(', ')
        for i in excl:
            tempSet = set(ds.ingSearch(i))
            drinks = drinks - tempSet
    drinks = jsonify({'Names': sorted(list(drinks))})

    return drinks


@app.route('/api/v1.1/names/', methods=['GET'])
def name():
    '''querying the database by drink name'''
    name = request.args.get('name')
    drinks = ds.nameSearch(name)
    drinksJSON = jsonify({'Names': drinks})
    
    return drinksJSON

'''
Error Handling

'''

@app.errorhandler(500)
def not_found():
    '''returns 500 page'''
    return make_response(jsonify({"error": "Internal Service Error"}), 500)

@app.errorhandler(404)
def not_found():
    '''returns 404 page'''
    return make_response(jsonify({"error": "Not found"}), 404)

if __name__ == '__main__':
    app.run(debug=False, use_reloader=False)
