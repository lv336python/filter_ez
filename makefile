USERNAME = oleksandr
MANAGE_PATH = car-statistics/manage.py
STATIC_PATH = car-statistics/app/static/


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
	(cd car-statistics ; celery -A app.celery worker -l info -n email@%h -Q email)

run:
	gnome-terminal -e "bash -c \"make celery; exec bash\""
	python car-statistics/run.py

back:
	make db
	make rabbitMQ

install:
	(cd $(STATIC_PATH) ; sudo npm install)
	(cd $(STATIC_PATH) ; sudo npm install -g @angular/cli)

build: $(STATIC_PATH)angular.json
	(cd $(STATIC_PATH) ; ng build)

all:
	make setup	
	make install
	make build
	make back
	make run
