# for testing python API

import requests
import pytest
from typing import List, Union


BASE_URL = "http://localhost:8080/api/v1.0/"

ABV = "ABV"
ALC = "AlcoholUnits"
BRI = "Brightness"
GAR = "Garnish"
ING = "IngredientString"
STY = "Style"
SWE = "Sweetness"
VOL = "Volume"

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
        if keyword == ING or keyword == STY or keyword == GAR:
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
            ("Negroni", ABV, 0.224),
            ("Negroni", ABV, 0.224),
            ("Negroni", ALC, 0.805),
            ("Negroni", BRI, 0.006),
            ("Negroni", GAR, "orange twist"),
            ("Negroni", ING, "Campari | gin | sweet vermouth"),
            ("Negroni", STY, "built"),
            ("Negroni", SWE, 0.4),
            ("Negroni", VOL, 3.6),
            ("Margarita", ABV, 0.192),
            ("Margarita", ALC, 1.1),
            ("Margarita", BRI, 0.06),
            ("Margarita", GAR, "salt rim and lime wedge"),
            (
                "Margarita",
                ING,
                "Cointreau | agave nectar | lime juice | tequila reposado",
            ),
            ("Margarita", STY, "shaken"),
            ("Margarita", SWE, 0.454),
            ("Margarita", VOL, 5.737),
            ("Martinez", ABV, 0.238),
            ("Martinez", ALC, 0.837),
            ("Martinez", BRI, 0.006),
            ("Martinez", GAR, "lemon twist"),
            (
                "Martinez",
                ING,
                "Angostura bitters | Luxardo Maraschino | gin | sweet vermouth",
            ),
            ("Martinez", STY, "stirred"),
            ("Martinez", SWE, 0.218),
            ("Martinez", VOL, 3.521),
        ],
    )
    def test_api_values(self, name: str, param: str, expected_value: Union[float, str]):
        """Do we get the right results for various queries?"""
        assert self._check_api_values(name, param) == expected_value
