from celery import shared_task
from .models import TransactionLog
from django.db import transaction


# Add celery
@transaction.atomic
def log_transaction(transaction_data, webhook_data):

    print("writing transaction to db")
    TransactionLog.objects.create(
        amount=transaction_data["amount"],
        currency=transaction_data["currency"],
        refrence=transaction_data["reference"],
        payment_date_time=transaction_data["paid_at"],
        status=transaction_data["status"],
        logs=webhook_data,
    )
    print("writing to db completed")

# @shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=15, retry_jitter=True, retry_kwargs={'max_retries': 3})
# def log_transaction_task(self, transaction_data, webhook_data):

#     try:
#         print("transaction log ")
#         log_transaction(transaction_data, webhook_data)
#         print("transaction log saved")
#         return "transaction log saved"

#     except:
#         raise Exception()

