#!/usr/bin/python
# drinkStore.py

'''defines DrinkBase class for performing drinkBase searches'''

import sqlite3, json

class DrinkBase:
    #TODO: combine __init__ and connectDB?
    def __init__(self, database):
        self.database = database
     
    def connectDB(self):
        '''connects with sqlite3 database'''
        dbConnect = sqlite3.connect(self.database, check_same_thread=False)
        dbConnect.row_factory = lambda cursor, row: row[0]
        self.cursor = dbConnect.cursor()
    
    #TODO: refactor to combine self.cursor.fetchall/drinks into method
    #TODO: refactor to parametize and wildcard SQL

    def ingRegex(self, ingredient):
        '''populates set of drinks that contain 'ingredient'
        variable'''
        self.cursor.execute(
            'SELECT DISTINCT name FROM ingredients where ingredient \
                    like ? GROUP BY name', ('%'+ingredient+'%',))
        drinks = self.cursor.fetchall()
        drinks = sorted(set(drinks))
        return drinks

    def nameRegex(self, name):
        '''populates set of drinks whose name matches 'name' variable'''
        self.cursor.execute(
            'SELECT DISTINCT name from ingredients where name like ? \
                    GROUP BY name', ('%'+name+'%',))
        drinks = self.cursor.fetchall()
        drinks = sorted(set(drinks))
        return drinks

    def drinkSearch(self, included='', excluded='', drinkName=''):
        '''returns set of drinks based on included ingredients, excluded
        ingredients, or drink name'''
        #TODO: define search algorithm

    def getRecipe(self, drink):
        '''returns full recipe for 'drink' variable in JSON format'''
        #TODO: define recipe algorithm

# for development/debugging
db = DrinkBase('drinkBase.db')
db.connectDB()

## ingRegex
ryeDrinks = db.ingRegex('RYE')
print(ryeDrinks)

## nameRegex
frenchDrinks = db.nameRegex('french')
print(frenchDrinks)
