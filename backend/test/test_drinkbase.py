from typing import List
import subprocess
import logging

import docker
from docker import DockerClient
import pytest

from backend.src.drinkbase import DrinkBase


@pytest.fixture
def random_list() -> List[str]:
    pass


@pytest.fixture(scope="session", autouse=True)
def database():
    """spin up the database"""
    client = docker.from_env()
    # TODO: spin up database


@pytest.fixture
def log(caplog):
    logger = "drinkbase"
    caplog.set_level(logging.DEBUG, logger=logger)
    return logging.getLogger(logger)


class TestDrinkbase:
    def test_database_fixture(self, log):
        client = docker.from_env()
        log.debug(client.containers.list())
