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
	@if [ ! -d "~/home/oleksandr/lv-336/car-statistics/car-statistics/app/static/node_modules" ]; then \
		echo "npm install has already been installed";\
	else\
		sudo npm install\
		sudo npm install -g @angular/cli;\
	fi


$(TARGET): angular.json
	ng build
