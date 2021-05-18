# for testing python API

import unittest, requests
from exclusions import noJuiceBitters


baseUrl = "http://localhost/api/v1.0/"

# for name and ingredient searches
def api(url):
    r = requests.get(baseUrl + url)
    drinks = r.json()["Drinks"]
    drinklist = []
    for i in drinks:
        drinklist.append(i["Name"])
    return sorted(drinklist)

# for drinkViz/data searches
abv = 'ABV'
alc = 'AlcoholUnits'
bri = 'Brightness'
gar = 'Garnish'
ing = 'IngredientString'
sty = 'Style'
swe = 'Sweetness'
vol = 'Volume'
def drinkViz(drink, keyword):
    url = baseUrl + 'names/?name=' + drink
    r = requests.get(url)
    drinks = r.json()["Drinks"]
    value = drinks[0]['Data'][keyword]
    if keyword == ing or keyword == sty or keyword == gar:
        value = value
    else:
        value = round(value, 3)
    return value


    
class TestNameSearch(unittest.TestCase):
    '''tests nameSearch function'''
    # name tests 
    def test_single_name1(self):
        self.assertEqual(
            api("names/?name=bitter french"),
            ["Bitter French"]
            )
    def test_multiple__responses2(self):
        self.assertEqual(
            api("names/?name=negroni"), 
            ["Negroni", "Negroni Sbagliato", "Summer Negroni"]
            )
    # included tests
    def test_single_incl3(self):
        self.assertEqual(
            api("ingreds/?incl=heering"),
            ["Blood & Sand", "Singapore Sling"]
            )
    def test_more_single_incl4(self):
        self.assertEqual(
            api("ingreds/?incl=cocchi"),
            ["20th Century", "Corpse Reviver #0824", "Vesper"]
            )
    def test_multiple_incl5(self):
        self.assertEqual(
            api("ingreds/?incl=bourbon, grapefruit"),
            ["Brown Derby"]
            )
    def test_more_multiple_incl6(self):
        self.assertEqual(
            api("ingreds/?incl=apple, mint"),
            ["Jersey Julep"]
            )
    # excluded tests
    def test_multiple_excl8(self):
        self.assertEqual(
            api("ingreds/?excl=juice, bitters"),
            noJuiceBitters
            )
    # excluded & included tests
    def test_single_incl_and_excl9(self):
        self.assertEqual(
            api("ingreds/?incl=fernet&excl=whiskey"),
            ["Hanky Panky", "Montegomatica", "Stazione Strega"]
            )
    def test_multiple_incl_single_excl10(self):
        self.assertEqual(
            api("ingreds/?incl=rye, vermouth&excl=bitters"),
            ["Boulevardier", "Old Pal"] 
            )
    def test_single_incl_multiple_excl11(self):
        self.assertEqual(
            api("ingreds/?incl=grapefruit&excl=tequila, rum"),
            ["Blonde Redhead", "Brown Derby"]
            )
    def test_multiple_incl_multiple_excl12(self):
        self.assertEqual(
            api("ingreds/?incl=rye, vermouth&excl=bitters, juice"),
            ["Boulevardier", "Old Pal"]
            )

    def test_edge_case_incl_blank_excl(self):
        self.assertEqual(
            api("ingreds/?incl=heering&excl="),
            ["Blood & Sand", "Singapore Sling"]
            )
    #drinkViz tests
    def test_abv(self):
        self.assertEqual(drinkViz('Negroni', abv),.224)
    
    def test_alcohol_units(self):
        self.assertEqual(drinkViz('Negroni', alc), 0.805)

    def test_brightness(self):
        self.assertEqual(drinkViz('Negroni', bri), 0.006)
    
    def test_garnish(self):
        self.assertEqual(drinkViz('Negroni', gar), 'orange twist')

    def test_ingredient_string(self):
        self.assertEqual(drinkViz('Negroni', ing),
            'Campari | gin | sweet vermouth')

    def test_style(self):
        self.assertEqual(drinkViz('Negroni', sty), 'built')

    def test_sweetness(self):
        self.assertEqual(drinkViz('Negroni', swe), 0.4)

    def test_volume(self):
        self.assertEqual(drinkViz('Negroni', vol), 3.6)
    
    #TODO: write 
    '''
    def test_abv_(self):
        self.assertEqual(drinkViz('Ramos Gin Fizz', abv), '??')
    
    def test_alcohol_units(self):
        self.assertEqual(drinkViz('Ramos Gin Fizz', alc), '??')

    def test_brightness(self):
        self.assertEqual(drinkViz('Ramos Gin Fizz', bri), '??')
    
    def test_garnish(self):
        self.assertEqual(drinkViz('Ramos Gin Fizz', gar), '??')

    def test_ingredient_string(self):
        self.assertEqual(drinkViz('Ramos Gin Fizz', ing),
            '??')

    def test_style(self):
        self.assertEqual(drinkViz('Ramos Gin Fizz', sty), '??')

    def test_sweetness(self):
        self.assertEqual(drinkViz('Ramos Gin Fizz', swe), '??')

    def test_volume(self):
        self.assertEqual(drinkViz('Ramos Gin Fizz', vol), '??')
    '''
    
    def test_abv(self):
        self.assertEqual(drinkViz('Margarita', abv), 0.192) 
    
    def test_alcohol_units(self):
        self.assertEqual(drinkViz('Margarita', alc), 1.1)

    def test_brightness(self):
        self.assertEqual(drinkViz('Margarita', bri), 0.06)
    
    def test_garnish(self):
        self.assertEqual(drinkViz('Margarita', gar), 'salt rim and lime wedge')

    def test_ingredient_string(self):
        self.assertEqual(drinkViz('Margarita', ing),
            'Cointreau | lime juice | agave nectar | tequila reposado')

    def test_style(self):
        self.assertEqual(drinkViz('Margarita', sty), 'shaken')

    def test_sweetness(self):
        self.assertEqual(drinkViz('Margarita', swe), 0.454)

    def test_volume(self):
        self.assertEqual(drinkViz('Margarita', vol), 5.737)


    def test_abv(self):
        self.assertEqual(drinkViz('Martinez', abv), 0.238) 
    
    def test_alcohol_units(self):
        self.assertEqual(drinkViz('Martinez', alc), 0.837)

    def test_brightness(self):
        self.assertEqual(drinkViz('Martinez', bri), 0.006)
    
    def test_garnish(self):
        self.assertEqual(drinkViz('Martinez', gar), 'lemon twist')

    def test_ingredient_string(self):
        self.assertEqual(drinkViz('Martinez', ing),
            'Angostura bitters | Luxardo Maraschino | gin | sweet vermouth')

    def test_style(self):
        self.assertEqual(drinkViz('Martinez', sty), 'stirred')

    def test_sweetness(self):
        self.assertEqual(drinkViz('Martinez', swe), 0.218)

    def test_volume(self):
        self.assertEqual(drinkViz('Martinez', vol), 3.521)
if __name__ == "__main__":
    unittest.main()
