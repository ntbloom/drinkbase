# for testing python API

import unittest, requests
from exclusions import noGarnish, noJuiceBitters

baseUrl = "http://localhost:5000/api/v1.0/"

def api(url):
    r = requests.get(url)
    drinks = r.json()["Drinks"]
    drinklist = []
    for i in drinks:
        drinklist.append(i["Name"])
    return sorted(drinklist)

    
class TestNameSearch(unittest.TestCase):
    '''tests nameSearch function'''
    # name tests 
    def test_single_name(self):
        self.assertEqual(
            api(baseUrl + "names/?name=bitter french"),
            ["Bitter French"]
            )
    def test_multiple__responses(self):
        self.assertEqual(
            api(baseUrl + "names/?name=negroni"), 
            ["Negroni", "Summer Negroni"]
            )
    
    # included tests
    def test_single_incl_single(self):
        self.assertEqual(
            api(baseUrl + "ingreds/?incl=heering"),
            ["Blood & Sand"]
            )
    def test_more_single_incl(self):
        self.assertEqual(
            api(baseUrl + "ingreds/?incl=cocchi"),
            ["20th Century", "Vesper"]
            )
    def test_multiple_incl(self):
        self.assertEqual(
            api(baseUrl + "ingreds/?incl=rye&incl=grapefruit"),
            ["Brown Derby"]
            )
    def test_more_multiple_incl(self):
        self.assertEqual(
            api(baseUrl + "ingreds/?incl=apple&incl=cinnamon"),
            ["Apple Toddy"]
            )
    
    # excluded tests
    def test_single_excl(self):
        self.assertEqual(
            api(baseUrl + "ingreds/?excl=garnish"),
            noGarnish
            )
    def test_multiple_excl(self):
        self.assertEqual(
            api(baseUrl + "ingreds/?excl=juice&excl=bitters"),
            noJuiceBitters
            )
    
    # excluded & included tests
    def test_single_incl_and_excl(self):
        self.assertEqual(
            api(baseUrl + "ingreds/?incl=fernet&excl=whiskey"),
            ["Hanky Panky"]
            )
    def test_multiple_incl_single_excl(self):
        self.assertEqual(
            api(baseUrl +
            "ingreds/?incl=rye&incl=vermouth&excl=bitters"),
            ["Boulevardier", "Old Pal", "Scofflaw Cocktail"]
            )
    def test_single_incl_multiple_excl(self):
        self.assertEqual(
            api(baseUrl +
            "ingreds/?incl=grapefruit&excl=tequila&excl=rum"),
            ["Blonde Redhead", "Brown Derby"]
            )
    def test_multiple_incl_multiple_excl(self):
        self.assertEqual(
            api(baseUrl +
            "ingreds/?incl=rye&incl=rye&excl=bitters&excl=juice"),
            ["Boulevardier", "Old Pal"]
            )

    #TODO: edge cases where order is messed up
    def test_different_orders(self):
        self.assertEqual(
        api(baseUrl +
        "ingreds/?incl=grapefruit&excl=tequila&excl=rum"),
        api(baseUrl +
        "ingreds/?incl=grapefruit&excl=rum&excl=tequila")
        )
        
    def test_more_different_orders(self):
        self.assertEqual(
            api(baseUrl +
            "ingreds/?incl=rye&incl=vermouth&excl=bitters"),
            api(baseUrl +
            "ingreds/?excl=bitters&incl=rye&incl=vermouth"),
            )

    def test_further_different_orders(self):
        self.assertEqual(
            api(baseUrl +
            "ingreds/?incl=rye&incl=vermouth&excl=bitters"),
            api(baseUrl +
            "ingreds/?incl=vermouth&excl=bitters&incl=rye"),
            )

if __name__ == "__main__":
    unittest.main()
