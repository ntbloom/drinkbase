### Methods Used in DrinkBase class, defined in drinkStore.py
--
    def convertUnits(drink, ingredient):
        '''converts ingredient amount into ounces'''
--
    def drinkData(drink, SQLcolumn):
        '''returns data for given drink as dictionary'''
--
    def ingData(ingredient, SQLcolumn):
        '''returns data for given ingredient as dictionary'''
--
    def ingSearch(ingredient):
        '''populates set of drinks that contain 'ingredient' variable'''
--
    def getData(drink):
        '''returns chemistry and build data for each drink as dictionary'''
--
    def getIng(drink):
        '''returns list of ingredients for a given drink'''
--
    def getRecipe(drink):
        '''returns full recipe for 'drink' variable'''
--
    def nameSearch(name):
        '''populates set of drinks whose name matches 'name' variable'''
--
    def sendRecipe(drinks):
        '''formats recipe list as JSON data for given list of drink
