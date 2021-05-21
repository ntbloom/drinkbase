# for testing python API

import requests
import pytest


BASE_URL = "http://localhost:8080/api/v1.0/"

# for drinkViz/data searches
abv = "ABV"
alc = "AlcoholUnits"
bri = "Brightness"
gar = "Garnish"
ing = "IngredientString"
sty = "Style"
swe = "Sweetness"
vol = "Volume"

NO_JUICE_BITTERS = [
    "Americano",
    "Americano in Benevento",
    "Boulevardier",
    "Brandy Alexander",
    "Caipirinha",
    "Diamondback",
    "Grasshopper",
    "Hanky Panky",
    "Jersey Julep",
    "Lillet Vive",
    "Lucien Gaudin",
    "Mi To",
    "Mint Julep",
    "Negroni",
    "Negroni Sbagliato",
    "Old Pal",
    "Rusty Nail",
    "Stazione Strega",
    "Stinger",
    "Summer Negroni",
    "The Frank O’Hara",
    "Vesper",
]


def drinkViz(drink, keyword):
    url = BASE_URL + "names/?name=" + drink
    r = requests.get(url)
    drinks = r.json()["Drinks"]
    value = drinks[0]["Data"][keyword]
    if keyword == ing or keyword == sty or keyword == gar:
        value = value
    else:
        value = round(value, 3)
    return value


class TestDrinkBase:
    @staticmethod
    def api(url):
        """Test the API endpoint"""
        r = requests.get(BASE_URL + url)
        drinks = r.json()["Drinks"]
        drinklist = []
        for i in drinks:
            drinklist.append(i["Name"])
        return sorted(drinklist)

    @pytest.mark.parametrize(
        "api_args,expected_result",
        [
            ("names/?name=bitter french", ["Bitter French"]),
            ("names/?name=negroni", ["Negroni", "Negroni Sbagliato", "Summer Negroni"]),
            ("names/?name=negroni", ["Negroni", "Negroni Sbagliato", "Summer Negroni"]),
            (
                "ingreds/?incl=cocchi",
                ["20th Century", "Corpse Reviver #0824", "Vesper"],
            ),
            ("ingreds/?incl=bourbon, grapefruit", ["Brown Derby"]),
            ("ingreds/?incl=apple, mint", ["Jersey Julep"]),
            ("ingreds/?excl=juice, bitters", NO_JUICE_BITTERS),
            (
                "ingreds/?incl=fernet&excl=whiskey",
                ["Hanky Panky", "Montegomatica", "Stazione Strega"],
            ),
            ("ingreds/?incl=rye, vermouth&excl=bitters", ["Boulevardier", "Old Pal"]),
            (
                "ingreds/?incl=grapefruit&excl=tequila, rum",
                ["Blonde Redhead", "Brown Derby"],
            ),
            (
                "ingreds/?incl=rye, vermouth&excl=bitters, juice",
                ["Boulevardier", "Old Pal"],
            ),
            ("ingreds/?incl=heering&excl=", ["Blood & Sand", "Singapore Sling"]),
        ],
    )
    def test_api(self, api_args, expected_result):
        assert self.api(api_args) == expected_result


#         )
#
#     # drinkViz tests
#     def test_abv(self):
#         self.assertEqual(drinkViz("Negroni", abv), 0.224)
#
#     def test_alcohol_units(self):
#         self.assertEqual(drinkViz("Negroni", alc), 0.805)
#
#     def test_brightness(self):
#         self.assertEqual(drinkViz("Negroni", bri), 0.006)
#
#     def test_garnish(self):
#         self.assertEqual(drinkViz("Negroni", gar), "orange twist")
#
#     def test_ingredient_string(self):
#         self.assertEqual(drinkViz("Negroni", ing), "Campari | gin | sweet vermouth")
#
#     def test_style(self):
#         self.assertEqual(drinkViz("Negroni", sty), "built")
#
#     def test_sweetness(self):
#         self.assertEqual(drinkViz("Negroni", swe), 0.4)
#
#     def test_volume(self):
#         self.assertEqual(drinkViz("Negroni", vol), 3.6)
#
#     # TODO: write
#     """
#     def test_abv_(self):
#         self.assertEqual(drinkViz('Ramos Gin Fizz', abv), '??')
#
#     def test_alcohol_units(self):
#         self.assertEqual(drinkViz('Ramos Gin Fizz', alc), '??')
#
#     def test_brightness(self):
#         self.assertEqual(drinkViz('Ramos Gin Fizz', bri), '??')
#
#     def test_garnish(self):
#         self.assertEqual(drinkViz('Ramos Gin Fizz', gar), '??')
#
#     def test_ingredient_string(self):
#         self.assertEqual(drinkViz('Ramos Gin Fizz', ing),
#             '??')
#
#     def test_style(self):
#         self.assertEqual(drinkViz('Ramos Gin Fizz', sty), '??')
#
#     def test_sweetness(self):
#         self.assertEqual(drinkViz('Ramos Gin Fizz', swe), '??')
#
#     def test_volume(self):
#         self.assertEqual(drinkViz('Ramos Gin Fizz', vol), '??')
#     """
#
#     def test_abv(self):
#         self.assertEqual(drinkViz("Margarita", abv), 0.192)
#
#     def test_alcohol_units(self):
#         self.assertEqual(drinkViz("Margarita", alc), 1.1)
#
#     def test_brightness(self):
#         self.assertEqual(drinkViz("Margarita", bri), 0.06)
#
#     def test_garnish(self):
#         self.assertEqual(drinkViz("Margarita", gar), "salt rim and lime wedge")
#
#     def test_ingredient_string(self):
#         self.assertEqual(
#             drinkViz("Margarita", ing),
#             "Cointreau | lime juice | agave nectar | tequila reposado",
#         )
#
#     def test_style(self):
#         self.assertEqual(drinkViz("Margarita", sty), "shaken")
#
#     def test_sweetness(self):
#         self.assertEqual(drinkViz("Margarita", swe), 0.454)
#
#     def test_volume(self):
#         self.assertEqual(drinkViz("Margarita", vol), 5.737)
#
#     def test_abv(self):
#         self.assertEqual(drinkViz("Martinez", abv), 0.238)
#
#     def test_alcohol_units(self):
#         self.assertEqual(drinkViz("Martinez", alc), 0.837)
#
#     def test_brightness(self):
#         self.assertEqual(drinkViz("Martinez", bri), 0.006)
#
#     def test_garnish(self):
#         self.assertEqual(drinkViz("Martinez", gar), "lemon twist")
#
#     def test_ingredient_string(self):
#         self.assertEqual(
#             drinkViz("Martinez", ing),
#             "Angostura bitters | Luxardo Maraschino | gin | sweet vermouth",
#         )
#
#     def test_style(self):
#         self.assertEqual(drinkViz("Martinez", sty), "stirred")
#
#     def test_sweetness(self):
#         self.assertEqual(drinkViz("Martinez", swe), 0.218)
#
#     def test_volume(self):
#         self.assertEqual(drinkViz("Martinez", vol), 3.521)
#
#
# if __name__ == "__main__":
#     unittest.main()
