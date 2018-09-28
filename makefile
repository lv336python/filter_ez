.PHONY: make all
default: usage

usage:
	@echo
	@echo 'Usage: make <action>'
	@echo 'all	run front and back'
	@echo 

all:
	make -C ./car-statistics/app/static/ build
	make -C ./car-statistics/ run
