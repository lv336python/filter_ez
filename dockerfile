FROM python:3.6
COPY car-statistics/ /car-statistics
COPY requirements.txt /car-statistics/requirements.txt
WORKDIR /car-statistics/
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
