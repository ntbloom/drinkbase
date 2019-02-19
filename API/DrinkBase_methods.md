    def calcABV(self, drink):
      '''returns alcohol by volume for 'drink' as a float'''
--
    def calcAlcoholOz(self, drink):
      '''returns volume of alcohol in oz for 'drink' as a float'''
--
    def calcBrightness(self, drink):
      '''returns brightness value for 'drink' as a float'''
--
    def calcMelt(self, drink):
      '''returns melt value for 'drink' as a float'''
--
    def calcVolume(self, drink):
      '''returns total volume of drink as a float'''
--
    def drinkData(self, drink, SQLcolumn):
        '''returns prep data for 'drink' as a dictionary'''
--
    def ingData(self, ingredient, SQLcolumn):
        '''returns data for 'ingredient' as a dictionary'''
--
    def ingSearch(self, ingredient):
        '''returns drinks that contain 'ingredient' as a set'''
--
    def ingVolume(self, drink, ingredient):
        '''returns quantity of 'ingredient' in 'drink' in oz as a float'''
--
    def getIng(self, drink):
        '''returns ingredients in 'drink' as a list'''
--
    def getRecipe(self, drink):
        '''returns full recipe for 'drink' as a dictionary'''
--
    def nameSearch(self, nameQuery):
        '''returns drink names matching 'nameQuery' as set'''
--
    def sendData(self, drink):
        '''returns API-ready data for 'drink' as a dictionary'''
--
    def sendRecipe(self, drinks):
        '''returns full recipe for 'drinks' as JSON'''
