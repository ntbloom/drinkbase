def sendData(self, drink):
    '''returns API-ready data for 'drink' as a dictionary'''

    data = {}


External methods needed:
i) melt
ii) brightness
iii) sweetness
iv) ingABV 

ingredients = self.getIng(ingredients)
2) get volume for each ingredient in oz
3) put into dictionary

dataDict = {
    'gin': 1.0,
    'vermouth': 1.0,
    'Campari': 1.0
    }

- volume 
  add dataDict values plus melt

- alcoholUnits
  for loop over list returned by getIng
  ingABV method * dataDict[ingredient]

- ABV
  alcoholUnits/volume

- brightness
  for loop over list returned by getIng
  brightness method * dataDict[ingredient]

- garnish
  simple SQL query

- glass
  simple SQL query

- ingredientString
  concat from dataDict with pipes

- style
  simple SQL query

- sweetness
  for loop over list returned by getIng
  sweetness method * dataDict[ingredient]
