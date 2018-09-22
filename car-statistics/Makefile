PYTHON=python3

.PHONY: default usage
default: usage

usage:
	@echo
	@echo 'Usage: make <action>'
	@echo
	@echo '    setup        setup requirements'
	@echo '    db           init, migrate and upgrade db'
	@echo '    RabbitMQ     install RabbitMQ and run it'
	@echo '    Celery       start celery worker'
	@echo '    run          run local server'
	@echo

setup:
	pip install requirements.txt

db:
	python manage.py db init
	python manage.py db migrate
	python manage.py db upgrade

RabbitMQ:
	sudo apt install rabbitmq-server
	sudo rabbitmq-server

Celery:
	celery -A app.celery worker -l info -n email@%h -Q email

run:
	python run.py
