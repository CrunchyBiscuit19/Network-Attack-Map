# Install Django Backend
FROM python:latest
RUN mkdir -p /home/network-attack-map/django_backend
WORKDIR /home/network-attack-map/django_backend
ADD . /home/network-attack-map/django_backend
EXPOSE 8000

# Install Packages and Set Virtual Environment
RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev

RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz