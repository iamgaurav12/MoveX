# User Registration Endpoint

## Description
This endpoint allows for the registration of a new user. It performs input validation, hashes the password, creates a new user record in the database, and returns an authentication token upon successful registration.

## HTTP Method
`POST`

## Endpoint
`/users/register`

## Request Body
The request body must be a JSON object containing the following fields:

- `fullname`: An object with the following properties:
  - `firstname` (string, required, minimum 3 characters)
  - `lastname` (string, optional, minimum 3 characters)
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum 6 characters)

### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
    "password": "password123"
}
```

## Responses

### Success
- **Status Code**: 201 Created
- **Response Body**: A JSON object containing the authentication token and user details.

#### Example Success Response
```json
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Validation Errors
- **Status Code**: 400 Bad Request
- **Response Body**: A JSON object containing an array of validation error messages.

#### Example Validation Error Response
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

## Notes
- Ensure that the `Content-Type` header is set to `application/json` when making the request.
- The password is hashed before being stored in the database.
