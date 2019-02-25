#!/usr/bin/python3
# drinkStore.py -- defines DrinkBase class for querying drinkBase.db

import sqlite3
from flask import jsonify

class DrinkBase:
    def __init__(self, database):
        self.database = database
        dbConnect = sqlite3.connect(self.database, check_same_thread=False)
        dbConnect.row_factory = lambda cursor, row: row[0]
        
        # self.cursor can be used to define any SQL query
        # use self.cursor.fetchall() to actually run query
        self.cursor = dbConnect.cursor()
        
        # set of every drink named in the database
        self.cursor.execute('SELECT name FROM recipes GROUP BY name')
        self.allDrinks = set(sorted(self.cursor.fetchall()))

    def calcBrightness(self, ingredient):
        '''returns brightness value for 'ingredient' as a float'''
        
        self.cursor.execute('SELECT brightness FROM ingredients \
            WHERE ingredient = ?', (ingredient,))
        brightness = self.cursor.fetchall()
        try:
            return brightness[0]
        except:
            return 0

    def calcIngAbv(self, ingredient):
        '''returns ABV for 'ingredient' as a float'''

        self.cursor.execute('SELECT ingAbv FROM ingredients \
            WHERE ingredient = ?', (ingredient,))
        abv = self.cursor.fetchall()
        try:
            abv = abv[0]
        except:
            abv = 0

        return abv

    def calcMelt(self, drink):
        '''returns melt value for 'drink' as a float'''
        
        self.cursor.execute('SELECT style FROM prep \
            WHERE name = ?', (drink,))
        style = self.cursor.fetchall()
        style = style[0]

        melt = 0.0
        if style == 'built':
            melt =  0.2
        elif style == 'stirred':
            melt = 0.3
        elif style == 'shaken':
            melt = 0.35
        elif style == 'bubbly':
            melt = 0.1
        elif style == 'fizz':
            melt = 0.33
        elif style == 'swizzle':
            melt = 0.4
        else:
            melt = 0.28
        
        return melt

    def calcSweetness(self, ingredient):
        '''returns sweetness value of 'ingredient' as a float'''
        
        self.cursor.execute('SELECT sweetness FROM ingredients \
            WHERE ingredient = ?', (ingredient,))
        sweetness = self.cursor.fetchall()
        try:
            sweetness = sweetness[0]
        except:
            sweetness = 0

        return sweetness

    def drinkData(self, drink, SQLcolumn):
        '''returns prep data for 'drink' as a dictionary'''
 
        drinkDict = {}
        drinkDict['Name'] = drink
        
        #SQL queries for each column
        '''Note: SQLite prevents you from parametizing query terms to
        prevent SQL injection attacks. Only variables following an equal
        sign may be used dynamically'''
        self.cursor.execute(
            'SELECT garnish FROM prep WHERE name = ?', (drink,))
        garnish = self.cursor.fetchall()
        drinkDict['Garnish'] = garnish[0]
        self.cursor.execute(
            'SELECT glass FROM prep WHERE name = ?', (drink,))
        glass = self.cursor.fetchall()
        drinkDict['Glass'] = glass[0]
        self.cursor.execute(
            'SELECT notes FROM prep WHERE name = ?', (drink,))
        notes = self.cursor.fetchall()
        drinkDict['Notes'] = notes[0]
        self.cursor.execute(
            'SELECT style FROM prep WHERE name = ?', (drink,))
        style = self.cursor.fetchall()
        drinkDict['Style'] = style[0]
        
        return drinkDict[SQLcolumn]

    def ingSearch(self, ingredient):
        '''returns drinks that contain 'ingredient' as a set'''
        
        self.cursor.execute(
            'SELECT name FROM recipes where ingredient \
                    like ? GROUP BY name', ('%'+ingredient+'%',))
        drinks = self.cursor.fetchall()
        drinks = sorted(set(drinks))
        return drinks

    def ingVolume(self, drink, ingredient):
        '''returns quantity of 'ingredient' in 'drink' in oz as a float'''
        
        self.cursor.execute(
            'SELECT amount FROM recipes WHERE name = ? AND \
                ingredient = ?', (drink, ingredient))
        amount = self.cursor.fetchall()
        amount = amount[0]
        self.cursor.execute(
            'SELECT unit FROM recipes WHERE name = ? AND \
                ingredient = ?', (drink, ingredient))
        unit = self.cursor.fetchall()
        unit = unit[0]
        '''
        quick math refresher:
            1 dash = 1/48 oz
            1 oz = 1 oz (ha!)
            1 rinse = 1/16 oz
            1 tbl = 1/2 oz
            1 tsp = 1/6 oz
            estimating large egg white at 1 oz
        '''
        if unit == 'dash':
            return amount/48
        elif unit == 'oz':
            return amount
        elif unit == 'rinse':
            return amount/16
        elif unit == 'tbl':
            return amount/2
        elif unit == 'tsp':
            return amount/6
        elif unit == 'each' and ingredient == 'egg white':
            return amount
        else:
            return 0

    def getIng(self, drink):
        '''returns ingredients in 'drink' as a list'''
        
        self.cursor.execute(
            'SELECT ingredient FROM recipes WHERE name = ?', (drink,))
        ingredients = self.cursor.fetchall()
        return ingredients

    def getRecipe(self, drink):
        '''returns full recipe for 'drink' as a dictionary'''
        
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

    def nameSearch(self, nameQuery):
        '''returns drink names matching 'nameQuery' as set'''
        
        self.cursor.execute(
            'SELECT name from recipes where name like ? \
                    GROUP BY name', ('%'+nameQuery+'%',))
        drinks = self.cursor.fetchall()
        drinks = sorted(set(drinks))
        return drinks

    def sendData(self, drink):
        '''returns API-ready data for 'drink' as a dictionary'''
        # define structure to be jsonified
        data = {}

        # get all ingredients in qty
        ingredients = self.getIng(drink)
        ingDict = {}
        for i in ingredients:
            ingDict[i] = self.ingVolume(drink, i)

        # melt
        melt = self.calcMelt(drink)

        # drink volume
        volume = 0
        for i in ingDict.values():
            volume += i
        volume += volume * melt
        data['Volume'] = volume
        
        # alcohol units, brightness, sweetness
        alcohol = 0
        bright = 0
        sweet = 0
        for i in ingredients:
            alcohol += self.calcIngAbv(i)
            bright += self.calcBrightness(i)
            sweet += self.calcSweetness(i)
        data['AlcoholUnits'] = alcohol
        data['Brightness'] = bright
        data['Sweetness'] = sweet
        
        # ABV
        abv = alcohol/volume
        data['ABV'] = abv

        # garnish
        garnish = self.drinkData(drink, 'Garnish')
        data['Garnish'] = garnish

        # glass
        glass = self.drinkData(drink, 'Glass')
        data['Glass'] = glass

        # ingredientString
        ingredientString = ""
        for i in range(len(ingredients)-1):
            ingredientString += ingredients[i] + ' | '
        ingredientString += ingredients[-1]
        data['IngredientString'] = ingredientString

        # notes
        notes = self.drinkData(drink, 'Notes')
        data['Notes'] = notes

        #style
        style = self.drinkData(drink, 'Style')
        data['Style'] = style
        
        return data

    def sendRecipe(self, drinks):
        '''returns full recipe for 'drinks' as JSON'''
        
        drinkList = []
        for i in drinks:
            drinkDict = {}
            recipe = self.getRecipe(i)
            data = self.sendData(i)
            recipeDict = {'Recipe': recipe}
            drinkDict['Name'] = i
            drinkDict['Recipe'] = recipe
            drinkDict['Data'] = data
            drinkList.append(drinkDict)
        drinks = jsonify({'Drinks': drinkList})
        return drinks
