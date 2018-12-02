#!/usr/bin/python3
# api.py

'''python/flask script for running drinkBase back end'''

from drinkStore import DrinkBase
from flask import Flask, request, Response
from flask_cors import CORS

database = 'drinkBase.db'
ds = DrinkBase(database)

app = Flask(__name__)
CORS(app) #remove for production & configure in apache

#TODO: make api work with multiple ingredients

@app.route('/api/v1.0/ingreds/', methods=['GET'])
def ingreds():
    incl = request.args.get('incl')
    excl = request.args.get('excl')
    drinks = ds.allDrinks
    if incl:
        wanted = set(ds.ingSearch(incl))
        drinks = drinks & wanted
    if excl:
        unwanted = set(ds.ingSearch(excl))
        drinks = drinks - unwanted
    drinks = ds.sendRecipe(drinks)
    return drinks 

@app.route('/api/v1.0/names/', methods=['GET'])
def names():
    name = request.args.get('name')
    drinks = ds.nameSearch(name)
    drinks = ds.sendRecipe(drinks)
    return drinks


if __name__ == '__main__':
    app.run(debug=True, use_reloader=False, port=5000)
