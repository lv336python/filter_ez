USERNAME = oleksandr
MANAGE_PATH = filter_ez/manage.py
STATIC_PATH = filter_ez/app/static/


.PHONY: default usage
default: usage

usage:
	@echo
	@echo 'Usage: make <action>'
	@echo
	@echo '    setup        setup requirements'
	@echo '    db           init, migrate and upgrade db'
	@echo '    rabbitMQ     install RabbitMQ and run it'
	@echo '    celery       start celery worker'
	@echo '    run          run local server'
	@echo '	   back         make setup, db, RabbitMQ'
	@echo

setup:
	pip install -r requirements.txt

db:
	python $(MANAGE_PATH) db upgrade

rabbitMQ:
	sudo apt install rabbitmq-server
	sudo service rabbitmq-server restart || sudo rabbitmq-server

celery:
	(cd filter_ez ; celery -A app.celery worker -l info -n email@%h -Q email)

run:
	gnome-terminal -e "bash -c \"make celery; exec bash\""
	python filter_ez/run.py

install:
	(cd $(STATIC_PATH) ; npm install)
	sudo npm install -g @angular/cli

build: $(STATIC_PATH)angular.json
	(cd $(STATIC_PATH) ; ng build)

backend:
	make setup
	make db
	make rabbitMQ

frontend:
	make install
	make build
	make run
all:
	make frontend
	make backend
