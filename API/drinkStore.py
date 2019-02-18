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

    def drinkData(self, drink, SQLcolumn):
        '''returns data for given drink as dictionary'''
        drinkDict = {}
        variables = ['style', 'glass', 'garnish', 'notes']
        for i in variables:
            self.cursor.execute(
                'SELECT ? FROM prep where name = ?', (i, (drink,)))
            tempVar = self.cursor.fetchall()
            print("\n", drinkDict, "\n")
            drinkDict[i] = tempVar
        return drinkDict[SQLcolumn]

    def ingData(self, ingredient, SQLcolumn):
        '''returns data for given ingredient as dictionary'''
        ingDict = {}
        variables = ['class', 'ingAbv', 'sweetness', 'brightness']
        for i in variables:
            self.cursor.execute(
                'SELECT ? FROM ingredients where ingredient = ?', (i,ingredient))
            tempVar = self.cursor.fetchall()
            ingDict[i] = tempVar
        return ingDict[SQLcolumn]

    def ingSearch(self, ingredient):
        '''populates set of drinks that contain 'ingredient' variable'''
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
        garnish = self.drinkData(drink, "garnish")
        data['Garnish'] = garnish[0]

        #glass
        self.cursor.execute(
            'SELECT glass FROM prep WHERE name = ?', \
                    (drink,))
        glass = self.cursor.fetchall()
        data['Glass'] = glass[0]

        #TODO: ingredientString
        ingredientString = ""
        ingredients = self.getIng(drink)
        for i in range(len(ingredients)-1):
            ingredientString += ingredients[i] + ' | '
        ingredientString += ingredients[-1]
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

    def getIng(self, drink):
        '''returns list of ingredients for a given drink'''
        self.cursor.execute(
            'SELECT ingredient FROM recipes WHERE name = ?', (drink,))
        ingredients = self.cursor.fetchall()
        return ingredients

    def getRecipe(self, drink):
        '''returns full recipe for 'drink' variable'''
        ingredients = self.getIng(drink)
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


