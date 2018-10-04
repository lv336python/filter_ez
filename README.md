# car-statistics

<h3> To run server </h3>

1. Install all needed modules for python with command.
 ```commandline
$ pip install -r requirements.txt
```
2. Go to directory car-statistics/app/static and install all modules with npm.
```commandline
$ npm install
```
3. Update file local_settings.py in directory car-statistics/app.
```python
DATABASE = {
    'POSTGRES_USER': 'postgres',
    'POSTGRES_PASSWORD' : 'pass',
    'HOST' : 'localhost',
    'PORT' : 5432,
    'DB_NAME' : 'car_stats'
}

MAIL = {
    'MAIL_USERNAME': "your@mail.com",
    'MAIL_PASSWORD': "mysecretpassword",
    'ADMIN_MAIL' : 'admin_mail@gmail.com'
}
```
4. Move to directory car-statistics and run command for database migrations.
```commandline
$ python manage.py db init
$ python manage.py db migrate
$ python manage.py db upgrade
```
Please, if you want to make a migration, pull others migrations from git and right after you migrate push new versions
5. Install RabbitMQ and run it
```commandline
$ sudo apt install rabbitmq-server
...
$ sudo rabbitmq-server
```

6. Start celery worker which is going to complete all the time-consuming functions like filtering data, sending result files to email. Change directory to car-statistics and complete
```commandline
$ celery -A app.celery worker -l info -n email@%h -Q email
```

7. Run app
```commandline
$ python run.py
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

 2. Run script with configuration file as an argument.
```commandline
$ python car_statistics_generator.py generator_config.json
```
