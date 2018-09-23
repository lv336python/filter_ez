PYTHON = python3
TARGET = ng_build

.PHONY: make Front End
default: usage

usage:
	@echo
	@echo 'Usage: make <action>'
	@echo
	@echo '    ng_build     build angular app'
	@echo

all: $(TARGET)


$(TARGET): angular.json
	ng build
