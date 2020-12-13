FROM python:3.6
COPY requirements.txt /filter_ez/requirements.txt
WORKDIR /filter_ez/
RUN pip3 install -r requirements.txt
RUN pip install redis
