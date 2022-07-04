"""
BVN Authentication Code.
Input: BVN, Bank Code, AccountNum, First Name, Last Name, Middle Name. All inputs are string
Output: Status Code (True/False)
"""
from urllib import response
import requests
from requests.structures import CaseInsensitiveDict


def BvnVerification(BVN, BankCode, AccountNum, FirstName, LastName, MiddleName):
    url = "https://api.paystack.co/bvn/match"

    headers = CaseInsensitiveDict()
    headers["Authorization"] = "Bearer YOUR_SECRET_KEY"
    headers["Content-Type"] = "application/json"

    data = { "bvn": BVN, 
        "account_number": BankCode, 
        "bank_code": AccountNum, 
        "first_name": FirstName, 
        "last_name": LastName,
        "middle_name": MiddleName }
    
    data = """ data """

    resp = requests.post(url, headers=headers, data=data)

    print(resp.status_code)
    return resp