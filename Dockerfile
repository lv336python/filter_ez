FROM python:3.6
RUN apk add --update nodejs nodejs-npm
RUN apk add --update python3.6

RUN npm -v
RUN python -v

COPY requirements.txt /car-statistics/requirements.txt

WORKDIR /car-statistics/app/static/
RUN npm install
RUN ng build

WORKDIR /car-statistics/
RUN pip install -r requirements.txt
