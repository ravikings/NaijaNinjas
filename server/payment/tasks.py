from celery import shared_task
from accounts.models import AccountUser
from .models import TransactionLog, ClientPaymentInfo
from django.db import transaction



# Add celery
@transaction.atomic
def log_transaction(transaction_data):

    print("writing transaction to db")
    TransactionLog.objects.create(
        amount=transaction_data["amount"],
        currency=transaction_data["currency"],
        refrence=transaction_data["reference"],
        payment_date_time=transaction_data["paid_at"],
        status=transaction_data["status"],
        logs=transaction_data,
    )
    print("writing to db completed")

@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=15, retry_jitter=True, retry_kwargs={'max_retries': 3})
def save_payment_info(self, transaction_data):

    try:
        print("saving payment info log")
        authorization = transaction_data["authorization"]
        ClientPaymentInfo.objects.create(
            authorization_code = authorization["authorization_code"],
            last4 = authorization["last4"],
            exp_month = authorization["exp_month"],
            exp_year = authorization["exp_year"],
            card_type = authorization["card_type"],
            bank = authorization["bank"],
            country_code = authorization["country_code"],
            account_name = authorization["account_name"],
        )
        print("saving payment info log saved")
        return "saving payment info logsaved"

    except:
        raise Exception()

@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=15, retry_jitter=True, retry_kwargs={'max_retries': 3})
def log_transaction_task(self, transaction_data):

    try:
        print("transaction log ")
        log_transaction(transaction_data)
        print("transaction log saved")
        return "transaction log saved"

    except:
        raise Exception()