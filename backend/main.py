#!/usr/bin/python3
# main.py

'''python/flask script for running drinkBase back end'''

import drinkStore
from flask import Flask, render_template, request, redirect
import json

database = 'drinkBase.db'
ds = drinkStore.DrinkBase(database)

app = Flask(__name__)

@app.route('/')
def render_api():
    allDrinks = sorted(ds.allDrinks)
    
    #TODO: enter logic for included/excluded searches
    
    drinks = {}
    for drink in allDrinks:
        recipe = ds.getRecipe(drink)
        drinks[drink] = recipe
    drinks = json.dumps(drinks)

    #TODO: prettify json output
    return render_template('index.html', drinks=drinks)

if __name__ == '__main__':
    app.run(debug=True)
