import subprocess
import logging
from pathlib import Path
from time import sleep


import docker
import pytest

from backend.src.drinkbase import DrinkBase


@pytest.fixture
def drinkbase() -> DrinkBase:
    return DrinkBase("drinkbase")


@pytest.fixture(scope="session", autouse=True)
def database(log):
    """spin up the database"""
    docker_dir = Path(__file__).parent.parent.parent.joinpath("docker")
    log.info(docker_dir)
    up = subprocess.run(
        "docker-compose up -d db", shell=True, cwd=docker_dir, capture_output=True
    )
    up.check_returncode()
    connected = False
    timeout = 30
    while not connected and timeout > 0:
        connected = (
            subprocess.run(
                "nc -vz localhost 5432", shell=True, capture_output=True
            ).returncode
            == 0
        )
        timeout -= 1
        sleep(1)
        log.info(timeout)
    assert connected, "Failure to connect to postgresql"
    yield
    subprocess.run("docker-compose down", shell=True, cwd=docker_dir)


@pytest.fixture(scope="session")
def log():
    logger = "drinkbase"
    return logging.getLogger(logger)


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
        log.info(drinks)
        assert "Negroni" in drinks
