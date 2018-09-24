TARGET = build


.PHONY: make Front End
default: usage

usage:
	@echo
	@echo 'Usage: make <action>'
	@echo
	@echo '    install   install dependencies'
	@echo '    build     build angular app'
	@echo

all: $(TARGET)

install:
	npm install -g @angular/cli

$(TARGET): angular.json
	ng build
