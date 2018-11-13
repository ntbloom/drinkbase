#!/usr/bin/python3
# api.py

'''python/flask script for running drinkBase back end'''

from drinkStore import DrinkBase
from flask import Flask, request, jsonify
import json

database = 'drinkBase.db'
ds = DrinkBase(database)

app = Flask(__name__)

@app.route('/api/v1.0/ingreds/', methods=['GET'])
def ingreds():
    incl = request.args.get('incl')
    excl = request.args.get('excl')
    print(incl, '\n')
    print(excl, '\n')
    drinks = ds.allDrinks
    if incl:
        wanted = set(ds.ingSearch(incl))
        drinks = drinks & wanted
    if excl:
        unwanted = set(ds.ingSearch(excl))
        drinks = drinks - unwanted
    
    #TODO: refactor or make a class?
    drinkDict ={}
    for i in drinks:
        recipe = ds.getRecipe(i)
        recipeDict = {'Recipe': recipe}
        drinkDict[i] = recipeDict

    drinks = jsonify({'Drinks': drinkDict})
    return drinks 

@app.route('/api/v1.0/names/', methods=['GET'])
def names():
    name = request.args.get('name')
    drinks = ds.nameSearch(name)
     
    drinkDict ={}
    for i in drinks:
        recipe = ds.getRecipe(i)
        recipeDict = {'Recipe': recipe}
        nameDict = {'Name': i}
        drinkDict[i] = recipeDict

    drinks = jsonify(drinks)
    return drinks

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
