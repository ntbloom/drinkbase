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

    def ingSearch(self, ingredient):
        '''populates set of drinks that contain 'ingredient'
        variable'''
        self.cursor.execute(
            'SELECT DISTINCT name FROM ingredients where ingredient \
                    like ? GROUP BY name', ('%'+ingredient+'%',))
        drinks = self.cursor.fetchall()
        drinks = sorted(set(drinks))
        return drinks

    def nameSearch(self, name):
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
        self.cursor.execute(
            'SELECT ingredient from ingredients where name = ?', \
                    (drink,))
        ingredients = self.cursor.fetchall()
        recipe = []
        for i in ingredients:
            self.cursor.execute('SELECT amount FROM ingredients where \
                name = ? AND ingredient = ?', (drink, i))
            amount = self.cursor.fetchall()
            if int(amount[0]) == amount[0]:
                amount = str(int(amount[0]))
            else:
                amount = str(amount[0])
            self.cursor.execute('SELECT unit FROM ingredients where name \
                 = ? AND ingredient = ?', (drink, i))
            unit = self.cursor.fetchall()
            unit = str(unit[0])
            recipe.append(amount + ' ' + unit + ' ' + i)
        #TODO: jsonify drink recipes
        return recipe


# for development/debugging
db = DrinkBase('drinkBase.db')
db.connectDB()

## ingSearch
#ryeDrinks = db.ingSearch('RYE')
#print(ryeDrinks)

## nameSearch
#frenchDrinks = db.nameSearch('french')
#print(frenchDrinks)

# getRecipe
martinez = db.getRecipe('French 75')
print(martinez)


