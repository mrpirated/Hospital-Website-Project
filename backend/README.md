# API DOCUMENTATION


### Auth Routes

1. /api/login (POST)
   - request
        ```javascript
        "body":{
            "type":string,
            "email": string,
            "password": string
        }
        ```
   - response
        ```javascript
        {
            "message":string,
            "data": {
                "token":string,
                "user":{
                    "_id":0, // patient_id, doctor_id, admin_id depending on type
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
        ```javascript
        {
            "message": string
        }
        ```
2. /api/signup (POST)
   - request
        ``` javascript
        "body":{
            "type":string,
            "phone":string,
            "otp":string, // if this field is not present then otp will be sent on the phone number, call the api again with otp field
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
        ```javascript
        {
            "message":string,
            "token":string, // user will be logged in after signup
            "user":{
                "_id":number, // patient_id, doctor_id, admin_id depending on type
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
        ```javascript
        {
            "message": string
        }
        ```
3. /api/token (POST)
   - request
        ```javascript
        "body":{
            "token":string
        }
        ```
   - response
        ```javascript
        {
            "message":string,
            "data": {
                "user":{
                    "_id":number, // patient_id, doctor_id, admin_id depending on type
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
        ```javascript
        {
            "message": string
        }
        ```
4. /api/setAvailability (POST)
   - request
        ```javascript
        "body":{
            "token":string, 
            "start_time":string,
            "end_time":string
        }
        ```
   - response
        ```javascript
        {
            "message":string, 
        }
        ```
   - error
        ```javascript
        {
            "message": string
        }
        ```
5. /api/getPatientCases (GET)
   - request
        ```javascript
        "query":{
            "token":string 
        }
        ```
   - response
        ```javascript
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
        ```javascript
        {
            "message": string
        }
        ```
6. /api/getDoctors (GET)
    - request
        ```javascript
        "query":{
            "token":string 
        }
        ```
   - response
        ```javascript
        {
            "message":string, 
            "data": {
                "doctors":{
                    "doctor_id": number,
                    "first_name": string,
                    "last_name": string,
                    "dob": string,
                    "gender": string,
                    "address": string,
                    "email": string,
                    "phone": string
                }
            }
        }
        ```
   - error
        ```javascript
        {
            "message": string
        }
        ```
7. /api/newCase (POST)
   - request
        ```javascript
        "body":{
            "token":string,
            "case_description":string
        }
        ```
   - response
        ```javascript
        {
            "message":string, 
        }
        ```
   - error
        ```javascript
        {
            "message": string
        }
        ```
