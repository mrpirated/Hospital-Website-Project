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
                    "_id":0, 
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
            "otp":"", 
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
            "token":"", 
            "user":{
                "_id":0, 
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
                    "_id":0, 
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
            "token":"", 
            "start_time":"",
            "end_time":""
        }
        ```
   - response
        ```json
        {
            "message":"", 
        }
        ```
   - error
        ```json
        {
            "message": ""
        }
        ```
