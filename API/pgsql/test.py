from .pgStore import DrinkBase

db = DrinkBase("drinkbase")
print(db.testQuery)
