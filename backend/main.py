#!/usr/bin/python3
# main.py

'''python/flask script for running drinkBase back end'''

import drinkStore
from flask import Flask, jsonify
import json

database = 'drinkBase.db'
ds = drinkStore.DrinkBase(database)

app = Flask(__name__)

@app.route('/api.json')
def render_api():
    allDrinks = sorted(ds.allDrinks)
    
    #TODO: enter logic for included/excluded searches
    
    drinks = {}
    for drink in allDrinks:
        recipe = ds.getRecipe(drink)
        drinks[drink] = recipe

    #TODO: prettify json output
    return jsonify({'drinks': drinks})

if __name__ == '__main__':
    app.run(debug=True)
