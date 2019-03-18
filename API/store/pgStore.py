#!/usr/bin/python3
# drinkStore.py -- defines DrinkBase class for querying postgresql database

import psycopg2
from flask import jsonify

class DrinkBase:
    def __init__(self, database):
        self.database = database
        self.connection = psycopg2.connect(
                "dbname=" + self.database + " user=postgres") 

        # self.cursor can be used to define any SQL query
        # use self.cursor.fetchall() to actually run query
        self.cursor = self.connection.cursor()
        
        # set of every drink named in the database
        self.cursor.execute('SELECT name FROM recipes GROUP BY name')
        self.allDrinks = set(sorted(self.cursor.fetchall()))

    def calcBrightness(self, drink):#TODO: convert all units to ounces
        '''returns brightness value for 'drink' as a float'''
        self.cursor.execute('''
                SELECT SUM(ingredients.brightness * recipes.amount)
                FROM ingredients
                INNER JOIN 
                    recipes ON ingredients.ingredient = recipes.ingredient
                WHERE recipes.name = %s
                GROUP BY recipes.name
                ''',
                (drink,))
        brightness = self.cursor.fetchone()
        return brightness[0]

    def calcSweetness(self, drink):#TODO: convert all units to ounces

        '''returns sweetness value of 'drink' as a float'''
        self.cursor.execute('''
                SELECT SUM(ingredients.sweetness * recipes.amount)
                FROM ingredients
                INNER JOIN 
                    recipes ON ingredients.ingredient = recipes.ingredient
                WHERE recipes.name = %s
                GROUP BY recipes.name
                ''',
                (drink,))
        sweetness = self.cursor.fetchone()
        return sweetness[0]

    def calcAlcoholUnits(self, drink):#TODO: convert all units to ounces

        '''returns alcohol value of 'drink' as a float'''
        self.cursor.execute('''
                SELECT SUM(ingredients.ingAbv * recipes.amount)
                FROM ingredients
                INNER JOIN 
                    recipes ON ingredients.ingredient = recipes.ingredient
                WHERE recipes.name = %s
                GROUP BY recipes.name
                ''',
                (drink,))
        alcoholUnits = self.cursor.fetchone()
        return alcoholUnits[0]
    
    def getStyle(self, drink):
        '''returns style of 'drink' as string'''
        self.cursor.execute(
                '''SELECT style FROM prep WHERE name = %s''',
                (drink,))
        style = self.cursor.fetchone()
        return style[0]

    def getGlass(self, drink):
        '''returns glass of 'drink' as string'''
        self.cursor.execute(
                '''SELECT glass FROM prep WHERE name = %s''',
                (drink,))
        glass = self.cursor.fetchone()
        return glass[0]

    def getGarnish(self, drink):
        '''returns garnish of 'drink' as string'''
        self.cursor.execute(
                '''SELECT garnish FROM prep WHERE name = %s''',
                (drink,))
        garnish = self.cursor.fetchone()
        return garnish[0]








    #TODO: rewrite for postgres
    def calcIngAbv(self, ingredient):
        '''returns ABV for 'ingredient' as a float'''

        self.cursor.execute('SELECT ingAbv FROM ingredients \
            WHERE ingredient = ?', (ingredient,))
        abv = self.cursor.fetchall()
        abv = abv[0]
        return abv

    #TODO: rewrite for postgres
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

    #TODO: rewrite for postgres
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

    #TODO: rewrite for postgres
    def ingSearch(self, ingredient):
        '''returns drinks that contain 'ingredient' as a set'''
        
        self.cursor.execute(
            'SELECT name FROM recipes where ingredient \
                    like ? GROUP BY name', ('%'+ingredient+'%',))
        drinks = self.cursor.fetchall()
        drinks = sorted(set(drinks))
        return drinks

    #TODO: rewrite for postgres
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

    #TODO: rewrite for postgres
    def getIng(self, drink):
        '''returns ingredients in 'drink' as a list'''
        
        self.cursor.execute(
            'SELECT ingredient FROM recipes WHERE name = ?', (drink,))
        ingredients = self.cursor.fetchall()
        return ingredients

    #TODO: rewrite for postgres
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

    #TODO: rewrite for postgres
    def nameSearch(self, nameQuery):
        '''returns drink names matching 'nameQuery' as set'''
        
        self.cursor.execute(
            'SELECT name from recipes where name like ? \
                    GROUP BY name', ('%'+nameQuery+'%',))
        drinks = self.cursor.fetchall()
        drinks = sorted(set(drinks))
        return drinks

    #TODO: rewrite for postgres
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
        #TODO: mulitply these values by their amounts
        for i in ingredients:
            try:
                alcohol += self.calcIngAbv(i)
            except:
                alcohol = 0
            try:
                bright += self.calcBrightness(i)
            except:
                bright = 0
            try:
                sweet += self.calcSweetness(i)
            except:
                sweet = 0
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

    #TODO: rewrite for postgres
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
