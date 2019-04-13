#!/usr/bin/python3
''' api.py - python/flask script for running drinkBase back end'''

from store.pgStore import DrinkBase
from flask import Flask, request, make_response, jsonify

DS = DrinkBase('drinkbase')
APP = Flask(__name__)



@APP.route('/api/v1.0/ingreds/', methods=['GET'])
def ingreds():
    '''querying the database by ingredient'''
    incl = request.args.get('incl')
    excl = request.args.get('excl')
    drinks = DS.allDrinks
    if incl:
        incl = incl.split(',')
        for i in incl:
            tempSet = set(DS.ingSearch(i))
            drinks = drinks & tempSet
    if excl:
        excl = excl.split(',')
        for i in excl:
            tempSet = set(DS.ingSearch(i))
            drinks = drinks - tempSet
    drinks = sorted(list(drinks))
    drinks = DS.sendRecipe(drinks)

    return drinks

@APP.route('/api/v1.0/names/', methods=['GET'])
def names():
    '''querying the database by drink name'''
    name = request.args.get('name')
    drinks = DS.nameSearch(name)
    drinks = DS.sendRecipe(drinks)
    return drinks

@APP.errorhandler(404)
def not_found():
    '''returns 404 page'''
    return make_response(jsonify({"error": "Not found"}), 404)

if __name__ == '__main__':
    APP.run(debug=True, use_reloader=False)
