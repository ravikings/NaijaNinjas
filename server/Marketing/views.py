from django.shortcuts import render, redirect
# Create your views here.

from accounts.models import AccountUser, RunnerProfile
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

def login_func(request):
    if not request.user.is_authenticated:
        if request.method == "POST":
            log_username = request.POST.get('log_username')
            log_password = request.POST.get('log_password')
            user = authenticate(username=log_username, password=log_password)

            if user is not None:
                login(request, user)
                messages.success(request, "Successfully Logged In !!")
                return redirect('marketing_func')
            else:
                messages.error(request, "Invalid Credentials, Please Try Again !!")
                return redirect('login_func')
        return render(request, 'marketing/login_page.html')
    else:
        return redirect('marketing_func')


def marketing_func(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            first_name = request.POST.get('first_name')
            last_name = request.POST.get('last_name')
            sign_email = request.POST.get('sign_email')
            sign_pass = request.POST.get('sign_pass')
            sign_confirm_pass = request.POST.get('sign_confirm_pass')
            sign_number = request.POST.get('sign_number')
            runner_status = request.POST.get('runner_status')

            if runner_status == 'Employer':
                var_runner = False
            else:
                var_runner = True



            title = request.POST.get('title')
            language = request.POST.get('language')
            salary = request.POST.get('salary')
            sector = request.POST.get('sector')
            department = request.POST.get('department')
            Description = request.POST.get('Description')
            county = request.POST.get('county')
            State = request.POST.get('State')
            Postcode = request.POST.get('Postcode')
            City = request.POST.get('City')
            Address = request.POST.get('Address')
            local_government_zone = request.POST.get('local_government_zone')




            if sign_pass == sign_confirm_pass:

                # create user
                myuser = AccountUser.objects.create_user(sign_email, sign_email, sign_pass)
                myuser.first_name = first_name
                myuser.last_name = last_name
                myuser.phone_number = sign_number
                myuser.is_active = True
                myuser.is_a_runner = var_runner
                myuser.save()

                var_RunnerProfile = RunnerProfile(author=myuser, first_name=first_name, last_name=last_name, title=title, language=language, salary=salary, country=county, address=Address, postcode=Postcode, sector=sector, department=department, description=Description, state=State, city=City, local_goverment_zone=local_government_zone )
                var_RunnerProfile.save()


                messages.success(request, "Your Account has been created !")
                return redirect('marketing_func')

                # var_User_Account = User_Account(first_name=first_name, last_name=last_name, Email=sign_email, Number=sign_number, Password=sign_pass)
                # var_User_Account.save()
                #
                # var_User_Profile = User_Profile(User=var_User_Account, title=title, language=language, salary=salary, sector=sector, department=department, Description=Description, county=county, State=State, Postcode=Postcode, City=City, Address=Address, local_government_zone=local_government_zone)
                # var_User_Profile.save()

            else:
                var_error = "Password is not match !"
                context = {'var_error':var_error, 'first_name':first_name, 'last_name':last_name, 'sign_email':sign_email, 'sign_number':sign_number, 'title':title, 'language':language, 'salary':salary, 'sector':sector, 'department':department, 'Description':Description, 'county':county, 'State':State, 'Postcode':Postcode, 'City':City, 'Address':Address, 'local_government_zone':local_government_zone}
                return render(request, "marketing/marketing.html", context)
        return render(request, "marketing/marketing.html")
    else:
        return redirect('login_func')


def func_logout(request):
    # this is for logout from user id
    logout(request)
    messages.success(request, "Logout Successfully !")
    return redirect('login_func')