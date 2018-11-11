#!/usr/bin/python3
# main.py

'''python/flask script for running drinkBase back end'''

import drinkStore
from flask import Flask, jsonify
import json

database = 'drinkBase.db'
ds = drinkStore.DrinkBase(database)

app = Flask(__name__)

def cleanInput(string):
    '''automatically puts included/excluded into list form for
    rendering'''
    
    #TODO: define this method. decide separator % or | or /
    
    return string


@app.route(
        '/api/v1.0/drinks/<included>/<excluded>/<name>', methods=['GET'])
def render_api(included, excluded, name):
    '''renders API in json format'''

    drinkList = set(ds.allDrinks)
    if included != '':   
        incl = set(ds.ingSearch(included))
        drinkList = drinkList & incl
    if excluded != '':
        excl = set(ds.ingSearch(excluded))
        drinkList = drinkList - excl
    #TODO: fix name logic
    if name != '':
        named = set(ds.nameSearch(name))
        drinkList = drinkList & named
    
    #TODO: fix for multiple ingredients

    
    drinks = []
    for drink in drinkList: 
        recipe =  ds.getRecipe(drink)
        drinkDict = {'Name': drink, 'Recipe': recipe}
        drinks.append(drinkDict)
    return jsonify({'Drinks': drinks})

if __name__ == '__main__':
    app.run(debug=True)
