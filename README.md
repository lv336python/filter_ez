# car-statistics

<h3>Start application in docker</h3>
1. Install docker and docker-compose with support of compose files at least version 2.2

2. Build bundle js with ng build:
```sh
    /car-statistics/app/static$ ng build
```
3. Make migrations to data base
```sh
    /car-statistics$ python manage.py db upgrade
```
4. Run docker-compose command in the directory with Dockerfile
```sh
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
$ python car_statistics_generator.py generator_config.json csv
```
