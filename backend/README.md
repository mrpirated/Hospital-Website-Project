# API DOCUMENTATION


### Auth Routes

1. /api/login (POST)
   - request
        ```json
        {
            "type":string,
            "email": string,
            "password": string
        }
        ```
   - response
        ```json
        {
            "message":string,
            "data": {
                "token":string,
                "user":{
                    "_id":0, 
                    "first_name":string,
                    "last_name":string,
                    "dob":string,
                    "gender":string,
                    "address":string,
                    "email":string,
                    "password":string,
                    "phone":string
                }
            }
        }
        ```
   - error
        ```json
        {
            "message": string
        }
        ```
2. /api/signup (POST)
   - request
        ``` json
        {
            "type":string,
            "phone":string,
            "otp":string, 
            "email":string,
            "password":string,
            "first_name":string,
            "last_name":string,
            "dob":string,
            "gender":string,
            "address":string
        }
        ```
    - response
        ```json
        {
            "message":string,
            "token":string, 
            "user":{
                "_id":number, 
                "first_name":string,
                "last_name":string,
                "dob":string,
                "gender":string,
                "address":string,
                "email":string,
                "password":string,
                "phone":string
            }
        }
        ```
    - error
        ```json
        {
            "message": string
        }
        ```
3. /api/token (POST)
   - request
        ```json
        {
            "token":string
        }
        ```
   - response
        ```json
        {
            "message":string,
            "data": {
                "user":{
                    "_id":number, 
                    "first_name":string,
                    "last_name":string,
                    "dob":string,
                    "gender":string,
                    "address":string,
                    "email":string,
                    "password":string,
                    "phone":string
                }
            }
        }
        ```
   - error
        ```json
        {
            "message": string
        }
        ```
4. /api/setAvailability (POST)
   - request
        ```json
        {
            "token":string, 
            "start_time":string,
            "end_time":string
        }
        ```
   - response
        ```json
        {
            "message":string, 
        }
        ```
   - error
        ```json
        {
            "message": string
        }
        ```
5. /api/getPatientCases (GET)
   - request
        ```
           /api/getPatientCases?token= 
        ```
   - response
        ```json
        {
            "message":string, 
            "data": {
                "cases":{
                    "case_id":number,
                    "case_description":string
                }
            }
        }
        ```
   - error
        ```json
        {
            "message": string
        }
        ```
