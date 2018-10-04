FROM python:3.6
COPY requirements.txt /car-statistics/requirements.txt
WORKDIR /car-statistics/
RUN pip3 install -r requirements.txt
