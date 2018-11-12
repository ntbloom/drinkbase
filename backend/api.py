#!/usr/bin/python3
# api.py

'''python/flask script for running drinkBase back end'''

import drinkStore
from flask import Flask, request, jsonify
import json, sqlite3

database = 'drinkBase.db'
ds = drinkStore.DrinkBase(database)

app = Flask(__name__)

@app.route('/api/v1', methods=['GET'])
def api():
    parameters = request.args
    
    included = parameters.get('inc')
    excluded = parameters.get('exc')
    name = parameters.get('name')
    
    query = "SELECT * FROM ingredients WHERE"
    queryFilter = []

    if included:
        query += ' ingredient = ?'
        queryFilter.append(included)
    
    results = ds.cursor.execute(query, queryFilter).fetchall()

    return jsonify(results)

    
    
if __name__ == '__main__':
    app.run(debug=True)
