.PHONY: make all
default: usage

usage:
	@echo
	@echo 'Usage: make <action>'
	@echo 'all	run front and back'
	@echo 'run 	run local server'

all:
	make -C ./car-statistics/app/static/ install
	make -C ./car-statistics/app/static/ build
	make -C ./car-statistics/ back
run:
	make -C ./car-statistics/app/static/ run
