#!/usr/bin/python3
# drinkStore.py -- defines DrinkBase class for querying drinkBase.db

import sqlite3
from flask import jsonify

class DrinkBase:
    def __init__(self, database):
        self.database = database
        dbConnect = sqlite3.connect(
            self.database, check_same_thread=False)
        dbConnect.row_factory = lambda cursor, row: row[0]
        
        # self.cursor can be used to define any SQL query
        # use self.cursor.fetchall() to actually run query
        self.cursor = dbConnect.cursor()
        
        # set of every drink named in the database
        self.cursor.execute(
            'SELECT name FROM recipes GROUP BY name')
        self.allDrinks = set(sorted(self.cursor.fetchall()))
    
    def ingSearch(self, ingredient):
        '''populates set of drinks that contain 'ingredient'
        variable'''
        self.cursor.execute(
            'SELECT name FROM recipes where ingredient \
                    like ? GROUP BY name', ('%'+ingredient+'%',))
        drinks = self.cursor.fetchall()
        drinks = sorted(set(drinks))
        return drinks

    def getData(self, drink):
        '''returns chemistry and build data for each drink as dictionary'''
        data = {}
        
        #TODO: abv
        abv = ""
        data['ABV'] = abv

        #TODO: alcoholUnits
        alcoholUnits = ""
        data['AlcoholUnits'] = alcoholUnits

        #TODO: brightness
        brightness = ""
        data['Brightness'] = brightness

        #garnish
        self.cursor.execute(
            'SELECT garnish FROM prep WHERE name = ?',\
                    (drink,))
        garnish = self.cursor.fetchall()
        data['Garnish'] = garnish[0]

        #glass
        self.cursor.execute(
            'SELECT glass FROM prep WHERE name = ?', \
                    (drink,))
        glass = self.cursor.fetchall()
        data['Glass'] = glass[0]

        #TODO: ingredientString
        ingredientString = ""
        data['IngredientString'] = ingredientString

        #TODO: melt
        melt = ""
        data['Melt'] = melt
        
        #TODO: volume
        volume = ""
        data['Volume'] = volume

        #style -- stirred, shaken, etc.
        self.cursor.execute(
            'SELECT style FROM prep WHERE name = ?', \
                    (drink,))
        style = self.cursor.fetchall()
        data['Style'] = style[0]

        return data

    def getRecipe(self, drink):
        '''returns full recipe for 'drink' variable'''
        self.cursor.execute(
            'SELECT ingredient FROM recipes WHERE name = ?', \
                    (drink,))
        ingredients = self.cursor.fetchall()
        recipe = []
        for i in ingredients:
            self.cursor.execute('SELECT amount FROM recipes where \
                name = ? AND ingredient = ?', (drink, i))
            amount = self.cursor.fetchall()
            amount = amount[0]           
            self.cursor.execute('SELECT unit FROM recipes where name \
                 = ? AND ingredient = ?', (drink, i))
            unit = self.cursor.fetchall()
            unit = str(unit[0])
            recipe.append({'Ingredient': i, 'Amount': amount,'Unit':
                unit})
            
        recipeDict = {'Ingredients': recipe}
        return recipe

    def nameSearch(self, name):
        '''populates set of drinks whose name matches 'name' variable'''
        self.cursor.execute(
            'SELECT name from recipes where name like ? \
                    GROUP BY name', ('%'+name+'%',))
        drinks = self.cursor.fetchall()
        drinks = sorted(set(drinks))
        return drinks

    def sendRecipe(self, drinks):
        '''formats recipe list as JSON data for given list of drink
        names'''
        drinkList = []
        for i in drinks:
            drinkDict = {}
            recipe = self.getRecipe(i)
            data = self.getData(i)
            recipeDict = {'Recipe': recipe}
            drinkDict['Name'] = i
            drinkDict['Recipe'] = recipe
            drinkDict['Data'] = data
            drinkList.append(drinkDict)
        drinks = jsonify({'Drinks': drinkList})
        return drinks


