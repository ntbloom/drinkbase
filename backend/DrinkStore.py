#!/usr/bin/python
# DrinkStore.py

'''defines DrinkStore class for performing drinkBase searches'''

import sqlite3, re, json

class DrinkStore:
    def __init__(self, database):
        self.database = database

    #TODO: figure out best way to populate DrinkStore with database data


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
