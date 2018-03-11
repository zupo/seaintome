# convenience makefile

.DEFAULT_GOAL := build



help:
	@echo "Usage:"
	@echo "    make help        show this message"
	@echo "    make setup       create virtual environment and install dependencies"
	@echo "    make lint        lint the plugins code"
	@echo "    make run         run the Lektor server"

setup:
	@pipenv install --dev

lint:
	@find . -name '*.pyc' -delete
	@pipenv run pyroma .
	@pipenv run flake8 setup.py
	@pipenv run flake8 src/plugins

run:
	@pipenv run lektor server

.PHONY: help
