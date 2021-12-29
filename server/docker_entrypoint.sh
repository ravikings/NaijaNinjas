#!/bin/bash

echo "Flush the manage.py command it any"

while ! python manage.py flush --no-input 2>&1; do
  echo "Flusing django manage command"
  sleep 3
done

echo "Makemigration to the Database"

echo "Migrate the Database at startup of project"
while ! python manage.py makemigrations  2>&1; do
   echo "Makemigrations is in progress status"
   sleep 1
done

# Wait for few minute and run db migraiton
while ! python manage.py migrate  2>&1; do
   echo "Migration is in progress status"
   sleep 3
done

echo "Django docker is fully configured successfully."

exec "$@"