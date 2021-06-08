from typing import List

import requests
import pytest
import threading

from backend.src.app import create_app
from werkzeug.serving import make_server

PORT = 5000
BASE_URL = f"http://localhost:{PORT}/api/v1.2/"

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


@pytest.fixture(scope="class")
def flask_app():
    """flask app fixture"""

    class Server:
        def __init__(self):
            self._server = make_server("localhost", PORT, create_app())

        def start(self):
            self._server.serve_forever()

        def stop(self):
            self._server.shutdown()

    server = Server()

    thread = threading.Thread(target=server.start)
    thread.start()
    yield
    server.stop()


class TestDrinkBase:
    @staticmethod
    def _check_api_names(url: str) -> List[str]:
        """Test the API endpoint"""
        r = requests.get(BASE_URL + url)
        return sorted(r.json()["Names"])

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
    def test_api_names(self, api_args: str, expected_names: List[str], flask_app):
        """Do we get the proper drink names for each query?"""
        assert self._check_api_names(api_args) == expected_names

    def test_api_values(self, flask_app):
        """Do we do the right data crunching? Use Negroni as an example. Also verifies parameters are all there"""
        url = BASE_URL + "allDrinks"
        drinks = requests.get(url).json()["Drinks"]

        # brute force search just to make sure we're doing math correctly
        for entry in drinks:
            if entry["Name"] == "Negroni":
                data = entry["Data"]
                assert round(data[ABV], 3) == 0.224
                assert round(data[ALC], 3) == 0.805
                assert round(data[BRI], 3) == 0.006
                assert round(data[SWE], 3) == 0.4
                assert round(data[VOL], 3) == 3.6
                assert data[GAR] == "orange twist"
                assert data[ING] == "Campari | gin | sweet vermouth"
                assert data[STY] == "built"
