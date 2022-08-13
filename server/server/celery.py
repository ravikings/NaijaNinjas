import os
from celery import Celery
from django.conf import settings
import threading

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
app = Celery("django_celery")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

def start_celery_worker():

    worker = app.Worker(app=app, pool="solo", concurrency=1, loglevel="INFO")
    thread = threading.Thread(target=worker.start)
    thread.daemon = True
    thread.start()

start_celery_worker()
#app.Worker(app=app, pool="eventlet", concurrency=5, loglevel="INFO").start()
#celery -A server worker --without-heartbeat --without-gossip --without-mingle