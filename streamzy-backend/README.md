# BACKEND

Contains all endpoints relating to the app.

Deployed at: https://streamzy-backend.siddhuv93.now.sh

### Auth

Route        | Method | Parameters | Description | Status Code | Response
-------------|--------|---------------------|-----------|-------------|-------------|-------
/auth/v1.0/login  | POST   | username, password | Login | 200 | Authentication successfull
||||| 401 | Authentication error
||
/auth/v1.0/signup | POST | username, password, name, email | Signup | 200 | Registration successfull
||||| 500 | Error during registration
||