from pgStore import DrinkBase

drink = 'Margarita'
db = DrinkBase("drinkbase")
print("brightness:", db.calcBrightness(drink))
print("sweetness:", db.calcSweetness(drink))
print("style:", db.getStyle(drink))
print("glass:", db.getGlass(drink))
print("garnish:", db.getGarnish(drink))
