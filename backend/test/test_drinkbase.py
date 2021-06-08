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

    def test_all_drinks(self, drinkbase: DrinkBase, log):
        """Test all drinks"""
        drinks = drinkbase.sendAllDrinks()
        assert "Negroni" in drinks
