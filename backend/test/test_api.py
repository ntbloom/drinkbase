# for testing python API

import requests
import pytest
from typing import List, Union


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


class TestDrinkBase:
    @staticmethod
    def _check_api_names(url: str) -> List[str]:
        """Test the API endpoint"""
        r = requests.get(BASE_URL + url)
        drinks = r.json()["Drinks"]
        drinklist = []
        for i in drinks:
            drinklist.append(i["Name"])
        return sorted(drinklist)

    @staticmethod
    def _check_api_values(drink: str, keyword: str) -> Union[float, str]:

        url = BASE_URL + "names/?name=" + drink
        r = requests.get(url)
        drinks = r.json()["Drinks"]
        value = drinks[0]["Data"][keyword]
        if keyword == ing or keyword == sty or keyword == gar:
            value = value
        else:
            value = round(value, 3)
        return value

    @pytest.mark.parametrize(
        "api_args,expected_names",
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
    def test_api_names(self, api_args: str, expected_names: List[str]):
        """Do we get the proper drink names for each query?"""
        assert self._check_api_names(api_args) == expected_names

    @pytest.mark.parametrize(
        "name,param,expected_value",
        [
            ("Negroni", abv, 0.224),
            ("Negroni", abv, 0.224),
            ("Negroni", alc, 0.805),
            ("Negroni", bri, 0.006),
            ("Negroni", gar, "orange twist"),
            ("Negroni", ing, "Campari | gin | sweet vermouth"),
            ("Negroni", sty, "built"),
            ("Negroni", swe, 0.4),
            ("Negroni", vol, 3.6),
            ("Margarita", abv, 0.192),
            ("Margarita", alc, 1.1),
            ("Margarita", bri, 0.06),
            ("Margarita", gar, "salt rim and lime wedge"),
            (
                "Margarita",
                ing,
                "Cointreau | agave nectar | lime juice | tequila reposado",
            ),
            ("Margarita", sty, "shaken"),
            ("Margarita", swe, 0.454),
            ("Margarita", vol, 5.737),
            ("Martinez", abv, 0.238),
            ("Martinez", alc, 0.837),
            ("Martinez", bri, 0.006),
            ("Martinez", gar, "lemon twist"),
            (
                "Martinez",
                ing,
                "Angostura bitters | Luxardo Maraschino | gin | sweet vermouth",
            ),
            ("Martinez", sty, "stirred"),
            ("Martinez", swe, 0.218),
            ("Martinez", vol, 3.521),
        ],
    )
    def test_api_values(self, name: str, param: str, expected_value: Union[float, str]):
        """Do we get the right results for various queries?"""
        assert self._check_api_values(name, param) == expected_value
