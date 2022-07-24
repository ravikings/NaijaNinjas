# FROM python

# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1
# RUN mkdir /code
# WORKDIR /code
# RUN pip install --upgrade pip
# COPY requirements.txt /code/

# RUN pip install -r requirements.txt



# COPY ./docker_entrypoint.sh ./docker_entrypoint.sh
# RUN chmod +x ./docker_entrypoint.sh

# COPY . /code/
# EXPOSE 8000

# ENTRYPOINT [ "./docker_entrypoint.sh" ]

FROM python:3.8

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV AWS_ACCESS_KEY_ID=AKIA525LDBK2M3KUXK3R 
ENV AWS_SECRET_ACCESS_KEY=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 
ENV AWS_DEFAULT_REGION=us-east-1  
RUN mkdir /code
WORKDIR /code
RUN pip install --upgrade pip
COPY requirements.txt /code/

RUN pip install -r requirements.txt
COPY . /code/


EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
