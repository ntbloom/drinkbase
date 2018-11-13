#!/usr/bin/python3
# api.py

'''python/flask script for running drinkBase back end'''

from drinkStore import DrinkBase
from flask import Flask, request, jsonify
import json

database = 'drinkBase.db'
ds = DrinkBase(database)

app = Flask(__name__)

@app.route('/api/names/', methods=['GET'])
def ingreds():
    incl = request.args.get('incl')
    #excl = request.args.get('excl')
    
    drinks = jsonify(ds.ingSearch(incl))
    return drinks 
    
if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
