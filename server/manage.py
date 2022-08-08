#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import subprocess

def run_terminal_celery():

    proc = subprocess.Popen("celery -A server worker -l info --without-gossip --without-mingle --without-heartbeat -Ofair --pool=solo", stdout=subprocess.PIPE)
    output, err = proc.communicate()
    print(output)

def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    execute_from_command_line(sys.argv)
    run_terminal_celery()


if __name__ == "__main__":
    main()
