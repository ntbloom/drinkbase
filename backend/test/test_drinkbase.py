import docker
import pytest

from backend.src.drinkbase import DrinkBase


@pytest.fixture
def drinkbase() -> DrinkBase:
    return DrinkBase("drinkbase")


class TestDrinkbase:
    def test_database_fixture(self, log):
        """assert database is up"""
        client = docker.from_env()
        containers = client.containers.list()
        found = False
        for container in containers:
            if container.name == "docker_db_1":
                found = True
                break
        assert found

    def test_all_drinks(self, drinkbase: DrinkBase):
        """Test all drinks"""
        drinks = drinkbase.send_all_drinks()
        assert "Negroni" in drinks
        assert "Pink Gin" in drinks

    def test_ing_search(self, drinkbase: DrinkBase):
        """Test ingredient search"""
        drinks = drinkbase.ing_search("vermouth")
        assert "Negroni" in drinks
        assert "Pink Gin" not in drinks

    def test_ing_string(self, drinkbase: DrinkBase):
        ingredients = drinkbase.get_ing_string("Negroni")
        assert ingredients == "Campari | gin | sweet vermouth"

    def test_get_recipe(self, drinkbase: DrinkBase):
        recipe = drinkbase.get_recipe("Negroni")
        ingredients = [item["Ingredient"] for item in recipe]
        for ingredient in ["Campari", "gin", "sweet vermouth"]:
            assert ingredient in ingredients

    def test_name_search(self, drinkbase: DrinkBase):
        names = drinkbase.name_search("Martini")
        assert "Martini" in names
        assert "Martinez" not in names
