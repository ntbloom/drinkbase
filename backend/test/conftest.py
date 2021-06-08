import subprocess
import logging
from pathlib import Path
from time import sleep

import pytest


def _port_is_open(port):
    return (
        subprocess.run(
            f"nc -vz localhost {port}", shell=True, capture_output=True
        ).returncode
        == 0
    )


@pytest.fixture(scope="session", autouse=True)
def database():
    """spin up the database"""
    docker_dir = Path(__file__).parent.parent.parent.joinpath("docker")
    up = subprocess.run(
        "docker-compose up -d db", shell=True, cwd=docker_dir, capture_output=True
    )
    up.check_returncode()
    connected = False
    timeout = 30
    while not connected and timeout > 0:
        connected = _port_is_open(5432)
        timeout -= 1
        sleep(1)
    assert connected, "Failure to connect to postgresql"

    yield
    subprocess.run(
        "docker-compose down", shell=True, cwd=docker_dir, capture_output=True
    )


@pytest.fixture(scope="session")
def log():
    logger = "drinkbase"
    return logging.getLogger(logger)
