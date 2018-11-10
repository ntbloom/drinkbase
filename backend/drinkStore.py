#!/usr/bin/python
# drinkStore.py

'''defines DrinkBase class for performing drinkBase searches'''

import sqlite3, re, json

class DrinkBase:
    def __init__(self, database):
        self.database = database
    
    def connectDB(self):
        '''connects with sqlite3 database'''
        dbConnect = sqlite3.connect(self.database, check_same_thread=False)
        dbConnect.row_factory = lambda cursor, row: row[0]
        self.cursor = dbConnect.cursor()
    
    
    def ingRegex(self, ingredient):
        '''populates set of drinks that contain 'ingredient'
        variable'''
        #TODO: define regex
        return True

    def nameRegex(self, name):
        '''populates set of drinks whose name matches 'name' variable'''
        #TODO: define regex
        return True

    def drinkSearch(self, included='', excluded='', drinkName=''):
        '''returns set of drinks based on included ingredients, excluded
        ingredients, or drink name'''
        #TODO: define search algorithm

    def getRecipe(self, drink):
        '''returns full recipe for 'drink' variable in JSON format'''
        #TODO: define recipe algorithm
