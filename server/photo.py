from importlib.metadata import packages_distributions
import pandas as pd
from passporteye import read_mrz

#packages_distributions
# pandas
# passporteye

def extractInfo(IdImage):
    # Process image
    mrz = read_mrz(IdImage)

    # Obtain image
    PassportInfo = mrz.to_dict()

    print('Nationality :'+ PassportInfo['nationality'])
    print('Given Name :'+ PassportInfo['names'])
    print('Surname :'+ PassportInfo['surname'])
    print('Passport type :'+ PassportInfo['type'])
    print('Date of birth :'+ PassportInfo['date_of_birth'])
    print('ID Number :'+ PassportInfo['personal_number'])
    print('Gender :'+ PassportInfo['sex'])
    print('Expiration date :'+ PassportInfo['expiration_date'])
    print(PassportInfo,file=open('passportdata.csv',"a"))

    Data = {"Nationality": [PassportInfo['nationality']],
           "Given Name": [PassportInfo['names']],
           "Surname": [PassportInfo['surname']],
           "Date of Birth" : [PassportInfo['date_of_birth']],
           "Gender" : [PassportInfo['sex']],
           "Expiration Date": [PassportInfo['expiration_date']] }

    df = pd.DataFrame(Data)

    return Data


extractInfo("fola2.jpeg")