
original R project logic
1) load tables from csv
2) convert all units to oz
3) multiply brightness, sugar, alcohol percentages by oz
4) account for ice melt
5) get total volume
6) convert abv, brightness, sugar into percentages

JSON format
drinks:
  0:
      Name: "Bitter French"
      Recipe:
        0 [index_of_recipe]: 
          Amount: 0.25
          Ingredient: "Campari"
          Unit: "oz"
        1: 
          Amount: 2.5
          Ingredient: "Champagne or sparkling wine"
          Unit: "oz"
        ...
      Data:
        ABV: 
        AlcoholUnits:
        Brightness: 
        Glass: 
        IngredientString:
        Melt:
        Volume:
        Style:
