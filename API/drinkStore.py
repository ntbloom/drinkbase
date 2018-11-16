#!/usr/bin/python
# drinkStore.py

'''defines DrinkBase class for performing drinkBase searches'''

import sqlite3
from flask import jsonify

class DrinkBase:
    def __init__(self, database):
        
        # file name, needs to end in .db
        self.database = database
        
        dbConnect = sqlite3.connect(
            self.database, check_same_thread=False)
        dbConnect.row_factory = lambda cursor, row: row[0]
        
        # self.cursor can be used to define any SQL query
        # use self.cursor.fetchall() to actually run query
        self.cursor = dbConnect.cursor()
        drinkNameQuery = self.cursor.execute(
            'SELECT DISTINCT name FROM ingredients GROUP BY name')
        
        # set of every drink named in the database
        self.allDrinks = set(sorted(self.cursor.fetchall()))
    
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

    def getRecipe(self, drink):
        '''returns full recipe for 'drink' variable'''
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
        recipeDict = {'Ingredients': recipe}
        return recipe

    def sendRecipe(self, drinks):
        '''formats recipe list as JSON data for given list of drink
        names'''
        drinkList = []
        for i in drinks:
            drinkDict = {}
            recipe = self.getRecipe(i)
            recipeDict = {'Recipe': recipe}
            drinkDict['Name'] = i
            drinkDict['Recipe'] = recipe
            drinkList.append(drinkDict)
        drinks = jsonify({'Drinks': drinkList})
        return drinks


# for development/debugging
# db = DrinkBase('drinkBase.db')

## ingSearch
#ryeDrinks = set(db.ingSearch('RYE'))
#vermouthDrinks = set(db.ingSearch('VERMOUTH'))
#drinks = ryeDrinks - vermouthDrinks
#print('rye: ', ryeDrinks)
#print('\nvermouth: ', vermouthDrinks)
#print('\ndrinks: ', drinks)

## nameSearch
#frenchDrinks = db.nameSearch('french')
#print(frenchDrinks)

## getRecipe
#martinez = db.getRecipe('Manhattan')
#print(martinez)
