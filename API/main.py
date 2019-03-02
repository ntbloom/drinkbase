#!/usr/bin/python3
# api.py

'''python/flask script for running drinkBase back end'''

from store.drinkStore import DrinkBase
from flask import Flask, request, Response, make_response, jsonify
from flask_cors import CORS

ds = DrinkBase('drinkBase.db')

app = Flask(__name__)
CORS(app) #TODO: remove for production & configure in apache


@app.route('/api/v1.0/ingreds/', methods=['GET'])
def ingreds():
    incl = request.args.get('incl')
    excl = request.args.get('excl')
    drinks = ds.allDrinks
    if incl:
        incl = incl.split(',')
        for i in incl:
            tempSet = set(ds.ingSearch(i))
            drinks = drinks & tempSet
    if excl:
        excl = excl.split(',')
        for i in excl:
            tempSet = set(ds.ingSearch(i))
            drinks = drinks - tempSet
    drinks = sorted(list(drinks))
    drinks = ds.sendRecipe(drinks)

    return drinks 

@app.route('/api/v1.0/names/', methods=['GET'])
def names():

    name = request.args.get('name')
    drinks = ds.nameSearch(name)
    drinks = ds.sendRecipe(drinks)

    return drinks

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({"error": "Not found"}), 404)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False, port=5000)
