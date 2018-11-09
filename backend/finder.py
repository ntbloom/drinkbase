#! usr/bin/python3
# finder.py -- file for executing drinkFinder searches in Flask app

import sqlite3, re

# connection to drinkBase.db
location = '../drinkBase.db'
drinkBase = sqlite3.connect(location, check_same_thread=False)
drinkBase.row_factory = lambda cursor, row: row[0]
cursor = drinkBase.cursor()

# create drinkDictionary from SQL database
drinkNames = []
drinkList = []
drinkDictionary = {}
cursor.execute('SELECT name FROM ingredients GROUP BY name')
drinkList = []
drinkList = cursor.fetchall()
for name in drinkList:
    name = name,
    cursor.execute('SELECT ingredient FROM ingredients where name like ? GROUP BY ingredient', name)
    name = name[0]
    ingredientTuple = cursor.fetchall()
    drinkDictionary[name] = ingredientTuple
drinkNames = sorted(drinkDictionary.keys()) # a list of all possible drink names

# regex function
def ingredientRegex(ingredient=''):
    '''populates a set of all drinks containing a given ingredient'''
    possibleDrinks = set()
    searchTermFixed = (r'\w*' + ingredient + r'\w*')
    searchTermRE = re.compile(searchTermFixed, re.IGNORECASE)
    for drink in drinkNames:
        ingredientList = drinkDictionary[drink]
        for ingredient in ingredientList:
            match = searchTermRE.search(ingredient)
            if match == None:
                continue
            else:
                possibleDrinks.add(drink)
    return possibleDrinks

# master search function called from webpage/Flask app
def drinkSearch(incIngredients='', exclIngredients=''):
    '''master search algorithm'''
    drinks = set(drinkNames)
    if len(incIngredients)>0:
        for ingredient in incIngredients:
            included = ingredientRegex(ingredient)
            drinks = drinks & included
    # print('\n\nincluded drinks: ', sorted(drinks), '\n\n') #for debugging only
    # print('excluded drinks: ', excluded, '\n\n') #for debugging only
    if len(exclIngredients)>0:
        for ingredient in exclIngredients:
             unwanted = ingredientRegex(ingredient)
             drinks = drinks - unwanted
    drinks = sorted(drinks)

    # debugging
    # print('length of included: ', len(incIngredients))   #for debugging only
    # print('included ingredients: ', incIngredients, '\n')  #for debugging only
    # print('length of excluded: ', len(exclIngredients))   #for debugging only
    # print('excluded ingredients: ', exclIngredients, '\n')  #for debugging only

    return drinks

def getRecipe(drinkName):
    '''looks up and returns recipe using SQL'''
    cursor.execute('SELECT ingredient FROM ingredients WHERE name = ?', (drinkName,))
    ingredientList = cursor.fetchall()
    recipe = []
    for i in ingredientList:
        cursor.execute('SELECT amount FROM ingredients where name = ? AND ingredient = ?', (drinkName, i))
        amount = cursor.fetchall()
        if int(amount[0]) == amount[0]:
            amount = str(int(amount[0]))
        else:
            amount = str(amount[0])
        cursor.execute('SELECT unit FROM ingredients where name = ? AND ingredient = ?', (drinkName, i))
        unit = cursor.fetchall()
        unit = str(unit[0])
        recipe.append(amount + ' ' + unit + ' ' + i)
    return recipe

'''debugging steps'''

# # for testing ingredients
# includedIngredients = ['vermouth']
# excludedIngredients = ['rye']

# print('allDrinks: ', allDrinks, '\n')
# searchResults = sorted(drinkSearch(includedIngredients, excludedIngredients))
# print('searchResults: ', searchResults)
# print('\n\n vermouth regex: ', ingredientRegex('vermouth'))
# print('\n\n rye regex: ', ingredientRegex('rye'))
# testRun = drinkSearch(includedIngredients, excludedIngredients)
# print(testRun)

# # for getRecipe debugging
# newTest = getRecipe('Gimlet')
# print(newTest)
