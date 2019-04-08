#!/usr/bin/python3
# api.py - python/flask script for running drinkBase back end

from store.pgStore import DrinkBase
from flask import Flask, request, Response, make_response, jsonify

ds = DrinkBase('drinkbase')
app = Flask(__name__)



@app.route('/api/v1.0/ingreds/', methods=['GET'])
#querying the database by ingredient
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
#querying the database by drink name
def names():
    name = request.args.get('name')
    drinks = ds.nameSearch(name)
    drinks = ds.sendRecipe(drinks)
    return drinks

#CORS headers. Uncomment for local development.

'''
@app.after_request
def make_cors(response):
    response.headers = {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true"
            }
    return response
'''

@app.errorhandler(404)

def not_found(error):
    return make_response(jsonify({"error": "Not found"}), 404)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
