from pgStore import DrinkBase

drink = 'Martinez'
ingredient = 'lux'
db = DrinkBase("drinkbase")
'''
print("brightness:", db.calcBrightness(drink))
print("sweetness:", db.calcSweetness(drink))
print("style:", db.getStyle(drink))
print("glass:", db.getGlass(drink))
print("garnish:", db.getGarnish(drink))
print("alcoholUnits:", db.calcAlcoholUnits(drink))
print("volume:", db.calcVolume(drink))
print(db.getIng(drink))
print(db.getRecipe(drink))
print(db.nameSearch('fre'))
print(db.getIngString(drink))
print(db.ingSearch(ingredient))
'''

#drinks = list of all drinks
db.cursor.execute('''
        SELECT DISTINCT name
        FROM recipes
        ;
        ''')
alldrinks = db.cursor.fetchall()
drinks = []
for i in alldrinks:
    drinks.append(i[0])

print(db.allDrinks)
print("\n\n")
print(db.ingSearch("rye"))

