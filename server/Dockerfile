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

FROM python

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
RUN pip install --upgrade pip
COPY requirements.txt /code/

RUN pip install -r requirements.txt
COPY . /code/


EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
