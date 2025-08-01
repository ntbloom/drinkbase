.PHONY:up
up:
	docker compose -f $(PWD)/docker/docker-compose.yaml up --build


BACKEND_DIR=$(PWD)/backend
POETRY=poetry --directory=$(BACKEND_DIR)
PYTEST=$(BACKEND_DIR)/.venv/bin/pytest
.PHONY:build-backend
build-backend:
	rm -rf $(BACKEND_DIR)/poetry.lock
	$(POETRY) install
	$(POETRY) update

.PHONY:test-backend
test-backend:
	$(PYTEST) -x 

