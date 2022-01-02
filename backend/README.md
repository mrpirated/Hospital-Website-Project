# API DOCUMENTATION


### Auth Routes

1. /api/login
   - request
        ```json
        {
            "type":"",
            "email": "",
            "password": ""
        }
        ```
   - response
        ```json
        {
            "message":"",
            "data": {
                "token":"",
                "user":{
                    "_id":0, <!--patient_id,doctor_id,admin_id depending on type-->
                    "first_name":"",
                    "last_name":"",
                    "dob":"",
                    "gender":"",
                    "address":"",
                    "email":"",
                    "password":"",
                    "phone":""
                }
            }
        }
        ```
   - error
        ```json
        {
            "message": ""
        }
        ```
2. /api/signup
   - request
        ``` json
        {
            "type":"",
            "phone":"",
            "otp":"", <!-- if not present then otp will be sent to given mobile number-->
            "email":"",
            "password":"",
            "first_name":"",
            "last_name":"",
            "dob":"",
            "gender":"",
            "address":""
        }
        ```
    - response
        ```json
        {
            "message":"",
            "token":"", <!-- user will be logged in after signup-->
            "user":{
                "_id":0, <!--patient_id,doctor_id,admin_id depending on type-->
                "first_name":"",
                "last_name":"",
                "dob":"",
                "gender":"",
                "address":"",
                "email":"",
                "password":"",
                "phone":""
            }
        }
        ```
    - error
        ```json
        {
            "message": ""
        }
        ```
3. /api/token
   - request
        ```json
        {
            "token":""
        }
        ```
   - response
        ```json
        {
            "message":"",
            "data": {
                "user":{
                    "_id":0, <!--patient_id,doctor_id,admin_id depending on type-->
                    "first_name":"",
                    "last_name":"",
                    "dob":"",
                    "gender":"",
                    "address":"",
                    "email":"",
                    "password":"",
                    "phone":""
                }
            }
        }
        ```
   - error
        ```json
        {
            "message": ""
        }
        ```
4. /api/setAvailability
   - request
        ```json
        {
            "token":"", <!-- only for doctors to set their availability-->
            "start_time":"",
            "end_time":""
        }
        ```
   - response
        ```json
        {
            "message":"", <!-- Availability set successfully or No New Availability-->
        }
        ```
   - error
        ```json
        {
            "message": ""
        }
        ```
