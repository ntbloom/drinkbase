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
        self.cursor.execute('SELECT DISTINCT name FROM recipes')
        temp = set()
        for i in self.cursor:
            temp.add(i[0])
        self.allDrinks = set(sorted(temp))

    def calcBrightness(self, drink):
        '''returns brightness value for 'drink' as a float'''
        self.cursor.execute('''
            SELECT 
                SUM(recipes.amount * units.conversion *
                ingredients.brightness)
            FROM recipes 
            INNER JOIN units ON recipes.unit = units.unit
            INNER JOIN ingredients ON recipes.ingredient =
                ingredients.ingredient
            WHERE recipes.name = %s
            GROUP BY recipes.name
            ''',
            (drink,))
        brightness = self.cursor.fetchone()
        try:
            return brightness[0]
        except:
            return 0

    def calcSweetness(self, drink):

        '''returns sweetness value of 'drink' as a float'''
        self.cursor.execute('''
            SELECT 
                SUM(recipes.amount * units.conversion *
                ingredients.sweetness)
            FROM recipes 
            INNER JOIN units ON recipes.unit = units.unit
            INNER JOIN ingredients ON recipes.ingredient =
                ingredients.ingredient
            WHERE recipes.name = %s
            GROUP BY recipes.name
            ''',
            (drink,))
        sweetness = self.cursor.fetchone()
        try:
            return sweetness[0]
        except:
            return 0

    def calcAlcoholUnits(self, drink):

        '''returns alcohol value of 'drink' as a float'''
        self.cursor.execute(
            '''
            SELECT 
                SUM(recipes.amount * units.conversion *
                    ingredients.ingAbv)
            FROM recipes 
            INNER JOIN units ON recipes.unit = units.unit
            INNER JOIN ingredients ON recipes.ingredient =
                ingredients.ingredient
            WHERE recipes.name = %s
            GROUP BY recipes.name
            ''', (drink,))
        alcoholUnits = self.cursor.fetchone()
        try:
            return alcoholUnits[0]
        except:
            return 0
    
    def getStyle(self, drink):
        '''returns style of 'drink' as string'''
        self.cursor.execute(
            '''
            SELECT style 
            FROM prep 
            WHERE name = %s
            ''', (drink,))
        style = self.cursor.fetchone()
        try:
            return style[0]
        except:
            return 0

    def getGlass(self, drink):
        '''returns glass of 'drink' as string'''
        self.cursor.execute(
            '''
            SELECT glass 
            FROM prep 
            WHERE name = %s
            ''', (drink,))
        glass = self.cursor.fetchone()
        try:
            return glass[0]
        except:
            return 0

    def getGarnish(self, drink):
        '''returns garnish of 'drink' as string'''
        self.cursor.execute(
            '''
            SELECT garnish 
            FROM prep 
            WHERE name = %s
            ''', (drink,))
        garnish = self.cursor.fetchone()
        try:
            return garnish[0]
        except:
            return 0

    def calcVolume(self, drink):
        '''returns volume of 'drink' as float'''
        self.cursor.execute(
            '''
            SELECT 
                SUM (recipes.amount * units.conversion * (1.0 + style.melt))
            FROM recipes
            INNER JOIN units ON recipes.unit = units.unit
            INNER JOIN prep ON recipes.name = prep.name
            INNER JOIN style ON prep.style = style.style
            WHERE recipes.name = %s
            GROUP BY recipes.name
            ''', (drink,))
        volume = self.cursor.fetchone()
        try:
            return volume[0]
        except:
            return 0

    def getNotes(self, drink):
        '''returns notes for 'drink' as string'''
        self.cursor.execute(
            '''
            SELECT notes 
            FROM prep 
            WHERE name = %s
            ''', (drink,))
        notes = self.cursor.fetchone()
        try:
            return notes[0]
        except:
            return 0

    def ingSearch(self, ingredient):
        '''returns drinks that contain 'ingredient' as a set'''
        self.cursor.execute(
            '''
            SELECT DISTINCT name 
            FROM recipes 
            WHERE LOWER(ingredient) LIKE %s
            ''', ("%"+ingredient.lower()+"%",))
        drinks = set()
        for i in self.cursor:
            drinks.add(i[0])
        return sorted(drinks)

    def getIngString(self, drink):
        '''returns ingredients in 'drink' as formatted string for API'''
        self.cursor.execute('''
            SELECT ingredient 
            FROM recipes 
            WHERE name = %s
            ''', (drink,))
        ingredients = []
        for i in self.cursor:
            ingredients.append(i[0])
        ingredients.sort() 
        ingredientString = ""
        for i in range(len(ingredients)-1):
            ingredientString += ingredients[i] + ' | '
        ingredientString += ingredients[-1]

        return ingredientString


    def getRecipe(self, drink):
        '''returns full recipe for 'drink' as a dictionary'''
        self.cursor.execute('''
            SELECT ingredient
            FROM recipes
            WHERE name = %s
            ''', (drink,))
        ingredients = []
        for i in self.cursor:
            ingredients.append(i[0])
        recipe = []
        for i in ingredients:
            self.cursor.execute('''
                SELECT amount 
                FROM recipes
                WHERE name = %s AND ingredient = %s
                ''', (drink, i))
            amount = self.cursor.fetchone()
            amount = amount[0]           
            self.cursor.execute('''
                SELECT unit 
                FROM recipes 
                WHERE name = %s AND ingredient = %s
                ''', (drink, i))
            unit = self.cursor.fetchone()
            unit = str(unit[0])
            recipe.append({'Ingredient': i, 'Amount': amount,'Unit':
                unit})
        recipeDict = {'Ingredients': recipe}
        return recipe

    def nameSearch(self, nameQuery):
        '''returns drink names matching 'nameQuery' as set'''
        self.cursor.execute('''
            SELECT DISTINCT name 
            FROM recipes 
            WHERE LOWER(name) LIKE %s
            ''', ('%'+nameQuery.lower()+'%',))
        drinks = set()
        for i in self.cursor:
            drinks.add(i[0])
        return sorted(drinks)

    def sendData(self, drink):
        '''returns API-ready data for 'drink' as a dictionary'''
        # define structure to be jsonified
        data = {}
        
        # results for each drink
        alcohol = self.calcAlcoholUnits(drink)
        volume = self.calcVolume(drink)
        abv = alcohol/volume
        bright = self.calcBrightness(drink)
        ingredientString = self.getIngString(drink)       
        garnish = self.getGarnish(drink)
        glass = self.getGlass(drink)
        notes = self.getNotes(drink)
        style = self.getStyle(drink)
        sweet = self.calcSweetness(drink)

        # add values to dictionary
        data['ABV'] = abv
        data['AlcoholUnits'] = alcohol
        data['Brightness'] = bright
        data['IngredientString'] = ingredientString
        data['Garnish'] = garnish
        data['Glass'] = glass
        data['Notes'] = notes
        data['Style'] = style
        data['Sweetness'] = sweet
        data['Volume'] = volume

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
