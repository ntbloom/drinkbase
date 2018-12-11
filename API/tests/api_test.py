# for testing python API

import unittest, requests
from exclusions import noGarnish, noJuiceBitters


def api(url):
    baseUrl = "http://localhost:5000/api/v1.0/"
    r = requests.get(baseUrl + url)
    drinks = r.json()["Drinks"]
    drinklist = []
    for i in drinks:
        drinklist.append(i["Name"])
    return sorted(drinklist)

    
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
            ["Negroni", "Summer Negroni"]
            )
    
    # included tests
    def test_single_incl3(self):
        self.assertEqual(
            api("ingreds/?incl=heering"),
            ["Blood & Sand"]
            )
    def test_more_single_incl4(self):
        self.assertEqual(
            api("ingreds/?incl=cocchi"),
            ["20th Century", "Vesper"]
            )
    def test_multiple_incl5(self):
        self.assertEqual(
            api("ingreds/?incl=rye,grapefruit"),
            ["Brown Derby"]
            )
    def test_more_multiple_incl6(self):
        self.assertEqual(
            api("ingreds/?incl=apple,mint"),
            ["Jersey Julep"]
            )
    
    # excluded tests
    def test_single_excl7(self):
        self.assertEqual(
            api("ingreds/?excl=garnish"),
            noGarnish
            )
    def test_multiple_excl8(self):
        self.assertEqual(
            api("ingreds/?excl=juice,bitters"),
            noJuiceBitters
            )
    
    # excluded & included tests
    def test_single_incl_and_excl9(self):
        self.assertEqual(
            api("ingreds/?incl=fernet&excl=whiskey"),
            ["Hanky Panky"]
            )
    def test_multiple_incl_single_excl10(self):
        self.assertEqual(
            api("ingreds/?incl=rye,vermouth&excl=bitters"),
            ["Boulevardier", "Old Pal", "Scofflaw Cocktail"]
            )
    def test_single_incl_multiple_excl11(self):
        self.assertEqual(
            api("ingreds/?incl=grapefruit&excl=tequila,rum"),
            ["Blonde Redhead", "Brown Derby"]
            )
    def test_multiple_incl_multiple_excl12(self):
        self.assertEqual(
            api("ingreds/?incl=rye,vermouth&excl=bitters,juice"),
            ["Boulevardier", "Old Pal"]
            )

if __name__ == "__main__":
    unittest.main()
