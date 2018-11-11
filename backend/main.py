#!/usr/bin/python3
# main.py

'''python/flask script for running drinkBase back end'''

import drinkStore
from flask import Flask, jsonify
import json

database = 'drinkBase.db'
ds = drinkStore.DrinkBase(database)

app = Flask(__name__)

@app.route('/')
def render_api():
    '''renders API in json format'''
    allDrinks = sorted(ds.allDrinks)
    
    #TODO: enter logic for included/excluded searches
    
    drinks = []
    for drink in allDrinks: # change var name when algorithm introduced
        recipe =  ds.getRecipe(drink)
        drinkDict = {'Name': drink, 'Recipe': recipe}
        drinks.append(drinkDict)
    return jsonify(drinks)

if __name__ == '__main__':
    app.run(debug=True)
