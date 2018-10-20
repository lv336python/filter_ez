# FilterEz

FilterEz is a web-application for filtering spreadsheet files in excel and csv format created by python-lv336 group.

Application gives to users an interactive way of filtering their data sets retrieving only needed information. Before getting to filtering user, will get statistical information about uploaded file in form of graphical charts and preview table.  

With this application user can store all uploaded files and filtering results, download them, watch statistics, send resulting data sets to his or her colleagues, friends or customers.

<h3>Start application in docker</h3>

1. Install docker and docker-compose with support of compose files at least version 2.2

2. Install all necessary packages with npm and build bundle js with ng build
![Frontend build](https://s2.gifyu.com/images/ezgif.com-optimizea93b78469155aa59.gif)
```commandline
    npm install
    ng build
```
3. Make migrations to Postgres Database
![Database migrations](https://s2.gifyu.com/images/postgres_migration.gif)
```sh
    docker exec -it <container id> /bin/bash 
    /filter_ez$ python manage.py db upgrade
```
4. Run docker-compose command in the directory with Dockerfile
![Dockerization](https://s2.gifyu.com/images/dockerize_part1.gif)
```sh
   sudo docker-compose up --build 
   sudo docker-compose up
```

<h3>To generate data with your own parameters:</h3>

 1. Create a json file with configuration settings.
 
```json5
{
  "ROW_NUMBER" : 20000,
  "COLUMNS" : {
    "StringCol" : {
      "type" : "string",
      "min_length" : 5,
      "max_length" : 10,
      "unique" : 10,
      "digit" : true,
      "capitalize" : true 
    },
    "IntCol" : {
      "type" : "int",
      "min_value" : 10,
      "max_value" : 20,
      "step" : 2,
      "unique" : 4
    },
    "FloatCol" : {
      "type" : "float",
      "min_value" : 0.2,
      "max_value" : 2.2,
      "step" : 0.1,
      "unique" : 14
    },
    "BoolCol" : {
      "type" : "bool",
      "choice" : [true]
    },
    "StringChoiceCol" : {
      "type" : "string",
      "choice" : ["Val1", "Val2", "Val3"]
    }
  }
}
```

 2. Run script with configuration file as an argument and type of output file (optional).
```commandline
    python mock_data_generator.py generator_config.json csv
```

<h3>Tests</h3>

1. Open bash in app container and change directory to tests/
![Test run](https://s2.gifyu.com/images/ezgif.com-gif-maker01ea6eb998025906.gif)

```comandline
    pytest # to run all tests
    pytest -s # to run and see all prints
    pytest test_register.py # to run the test-script
```

2. Check test coverage

```comandline
    pytest --cov=app tests/                 
    pytest --cov-report html  --cov=app tests/  
    pytest --cov-report html --cov-config .coveragerc  --cov=app tests/ 
```