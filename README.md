# car-statistics

1. Install all needed modules for python with command 
 ```commandline
$ pip install -r requirements.txt
```
2. Go to directory car-statistics/app/static and install all modules with npm
```commandline
$ npm install
```
3. Update file local_settings.py in directory car-statistics/app
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
    'MAIL_PASSWORD': "mysecretpassword"
}
```
4. Move to directory car-statistics and run command for database migrations
```commandline
$ python manage.py db init
$ python manage.py db migrate
$ python manage.py db upgrade
```
