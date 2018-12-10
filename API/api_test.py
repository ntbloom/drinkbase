# for testing python API

import unittest, requests

def api(argument, searchType, optExclusion=''):
    baseUrl = "http://localhost:5000/api/v1.0/"
    name = "names/?name="
    incl = "ingreds/?incl="
    excl = "ingreds/?excl="
    url = ""
    if searchType == "name":
        url = baseUrl + name + argument
    elif searchType == "incl":
        url = baseUrl + incl + argument
    elif searchType == "excl":
        url = baseUrl + excl + argument
    elif searchType == "both":
        url = baseUrl + incl + argument + "&?excl=" + optExclusion
    print("url: ", url)
    r = requests.get(url)
    drinks = r.json()["Drinks"]
    drinklist = []
    for i in drinks:
        drinklist.append(i["Name"])
    return sorted(drinklist)

    
class TestNameSearch(unittest.TestCase):
    '''tests nameSearch function'''
    def test_single_response(self):
        self.assertEqual(
            api("bitter french", "name"),
            ["Bitter French"]
            )
    def test_multiple__responses(self):
        self.assertEqual(
            api("negroni", "name"), 
            ["Negroni", "Summer Negroni"]
            )

class TestIngredients(unittest.TestCase):
    '''tests ingredient search function'''
    def test_single_incl_single_response(self):
        self.assertEqual(
            api("heering", "incl"),
            ["Blood & Sand"]
            )
    def test_single_incl_mult_responses(self):
        self.assertEqual(
            api("cocchi", "incl"),
            ["20th Century", "Vesper"]
        )
    def test_incl_and_excl(self):
        self.assertEqual(
            api("fernet", "both", "whiskey"),
            ["Hanky Panky"]
            )

if __name__ == "__main__":
    unittest.main()
