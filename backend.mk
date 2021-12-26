# Shell to use for running scripts
SHELL := $(shell which bash)

# Test if the dependencies we need to run this Makefile are installed
DOCKER := $(shell command -v docker)
DOCKER_COMPOSE := $(shell command -v docker-compose)
deps:
ifndef DOCKER
	@echo "Docker is not available. Please install docker"
	@exit 1
endif
ifndef DOCKER_COMPOSE
	@echo "docker-compose is not available. Please install docker-compose"
	@exit 1
endif

DB_USER=root
DB_PASS=pass

app-build: deps
	docker-compose build

app-start: deps
	docker-compose up

app-stop: deps
	docker-compose down

backend-test: deps
	docker-compose -f docker-compose-test.yaml up -d && cd ./backend && npm run test



$PHONY: deps