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

# User Login Endpoint

## Description
This endpoint allows an existing user to log in. It validates the input data, checks the user's credentials, and returns an authentication token upon successful login.

## HTTP Method
`POST`

## Endpoint
`/users/login`

## Request Body
The request body must be a JSON object containing the following fields:

- `email` (string, required, must be a valid email)
- `password` (string, required, minimum 6 characters)

### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success
- **Status Code**: 200 OK
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
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Authentication Errors
- **Status Code**: 401 Unauthorized
- **Response Body**: A JSON object containing an error message.

#### Example Authentication Error Response
```json
{
  "message": "Invalid Email or password"
}
```

## Notes
- Ensure that the `Content-Type` header is set to `application/json` when making the request.

# User Profile Endpoint

## Description
This endpoint allows an authenticated user to retrieve their profile information.

## HTTP Method
`GET`

## Endpoint
`/users/profile`

## Responses

### Success
- **Status Code**: 200 OK
- **Response Body**: A JSON object containing the user's profile information.

#### Example Success Response
```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

### Authentication Errors
- **Status Code**: 401 Unauthorized
- **Response Body**: A JSON object containing an error message.

#### Example Authentication Error Response
```json
{
  "message": "Unauthorized"
}
```

## Notes
- Ensure that the `Authorization` header is set to `Bearer <token>` when making the request.

# User Logout Endpoint

## Description
This endpoint allows an authenticated user to log out by invalidating by blacklisting their JWT token.

## HTTP Method
`GET`

## Endpoint
`/users/logout`

## Responses

### Success
- **Status Code**: 200 OK
- **Response Body**: A JSON object containing a success message.

#### Example Success Response
```json
{
  "message": "Logged Out"
}
```

### Authentication Errors
- **Status Code**: 401 Unauthorized
- **Response Body**: A JSON object containing an error message.

#### Example Authentication Error Response
```json
{
  "message": "Unauthorized"
}
```

## Notes
- Ensure that the `Authorization` header is set to `Bearer <token>` when making the request.

# Captain Registration Endpoint

## Description
This endpoint allows for the registration of a new captain. It performs input validation, hashes the password, creates a new captain record in the database, and returns an authentication token upon successful registration.

## HTTP Method
`POST`

## Endpoint
`/captains/register`

## Request Body
The request body must be a JSON object containing the following fields:

- `fullname`: An object with the following properties:
  - `firstname` (string, required, minimum 3 characters)
  - `lastname` (string, optional, minimum 3 characters)
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum 6 characters)
- `vehicle`: An object with the following properties:
  - `color` (string, required, minimum 3 characters)
  - `plate` (string, required, minimum 3 characters)
  - `capacity` (number, required, minimum 1)
  - `vehicleType` (string, required, must be one of `car`, `motorcycle`, `auto`)

### Example Request Body
```json
{
  "fullname": {
    "firstname": "John", // required, minimum 3 characters
    "lastname": "Doe" // optional, minimum 3 characters
  },
  "email": "john.doe@example.com", // required, must be a valid email
  "password": "password123", // required, minimum 6 characters
  "vehicle": {
    "color": "red", // required, minimum 3 characters
    "plate": "ABC123", // required, minimum 3 characters
    "capacity": 4, // required, minimum 1
    "vehicleType": "car" // required, must be one of 'car', 'motorcycle', 'auto'
  }
}
```

## Responses

### Success
- **Status Code**: 201 Created
- **Response Body**: A JSON object containing the authentication token and captain details.

#### Example Success Response
```json
{
  "token": "your_jwt_token",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
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
    },
    {
      "msg": "Color must be at least 3 characters long",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Plate must be at least 3 characters long",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Capacity must be at least 1",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

## Notes
- Ensure that the `Content-Type` header is set to `application/json` when making the request.
- The password is hashed before being stored in the database.

# Captain Login Endpoint

## Description
This endpoint allows an existing captain to log in. It validates the input data, checks the captain's credentials, and returns an authentication token upon successful login.

## HTTP Method
`POST`

## Endpoint
`/captains/login`

## Request Body
The request body must be a JSON object containing the following fields:

- `email` (string, required, must be a valid email)
- `password` (string, required, minimum 6 characters)

### Example Request Body
```json
{
  "email": "john.doe@example.com", // required, must be a valid email
  "password": "password123" // required, minimum 6 characters
}
```

## Responses

### Success
- **Status Code**: 200 OK
- **Response Body**: A JSON object containing the authentication token and captain details.

#### Example Success Response
```json
{
  "token": "your_jwt_token",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
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
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Authentication Errors
- **Status Code**: 401 Unauthorized
- **Response Body**: A JSON object containing an error message.

#### Example Authentication Error Response
```json
{
  "message": "Invalid email or password"
}
```

## Notes
- Ensure that the `Content-Type` header is set to `application/json` when making the request.

# Captain Profile Endpoint

## Description
This endpoint allows an authenticated captain to retrieve their profile information.

## HTTP Method
`GET`

## Endpoint
`/captains/profile`

## Responses

### Success
- **Status Code**: 200 OK
- **Response Body**: A JSON object containing the captain's profile information.

#### Example Success Response
```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Authentication Errors
- **Status Code**: 401 Unauthorized
- **Response Body**: A JSON object containing an error message.

#### Example Authentication Error Response
```json
{
  "message": "Unauthorized"
}
```

## Notes
- Ensure that the `Authorization` header is set to `Bearer <token>` when making the request.

# Captain Logout Endpoint

## Description
This endpoint allows an authenticated captain to log out by invalidating their JWT token.

## HTTP Method
`GET`

## Endpoint
`/captains/logout`

## Responses

### Success
- **Status Code**: 200 OK
- **Response Body**: A JSON object containing a success message.

#### Example Success Response
```json
{
  "message": "Logged Out"
}
```

### Authentication Errors
- **Status Code**: 401 Unauthorized
- **Response Body**: A JSON object containing an error message.

#### Example Authentication Error Response
```json
{
  "message": "Unauthorized"
}
```

## Notes
- Ensure that the `Authorization` header is set to `Bearer <token>` when making the request.
