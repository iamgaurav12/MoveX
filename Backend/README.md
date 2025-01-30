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

# Ride Creation Endpoint

## Description

This endpoint allows an authenticated user to create a new ride. It calculates the fare based on the distance and time between the pickup and destination, and generates an OTP for the ride.

## HTTP Method

`POST`

## Endpoint

`/rides/create`

## Request Body

The request body must be a JSON object containing the following fields:

- `pickup` (string, required, minimum 3 characters)
- `destination` (string, required, minimum 3 characters)
- `vehicleType` (string, required, must be one of `auto`, `car`, `moto`)

### Example Request Body

```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car"
}
```

## Responses

### Success

- **Status Code**: 201 Created
- **Response Body**: A JSON object containing the ride details.

#### Example Success Response

```json
{
  "user": "user_id",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": 100,
  "otp": "123456",
  "status": "pending"
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
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "body"
    },
    {
      "msg": "Invalid destination address",
      "param": "destination",
      "location": "body"
    },
    {
      "msg": "Invalid Vehicle Type",
      "param": "vehicleType",
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
  "message": "Unauthorized"
}
```

## Notes

- Ensure that the `Content-Type` header is set to `application/json` when making the request.
- Ensure that the `Authorization` header is set to `Bearer <token>` when making the request.

# Get Fare Endpoint

## Description

This endpoint allows an authenticated user to get the fare estimate for a ride based on the pickup and destination locations.

## HTTP Method

`GET`

## Endpoint

`/rides/get-fare`

## Query Parameters

- `pickup` (string, required, minimum 3 characters): The pickup location.
- `destination` (string, required, minimum 3 characters): The destination location.

### Example Request

```
GET /rides/get-fare?pickup=123%20Main%20St&destination=456%20Elm%20St
```

## Responses

### Success

- **Status Code**: 200 OK
- **Response Body**: A JSON object containing the fare estimates for different vehicle types.

#### Example Success Response

```json
{
  "auto": 50,
  "car": 100,
  "moto": 40
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
      "msg": "Invalid Pickup location",
      "param": "pickup",
      "location": "query"
    },
    {
      "msg": "Invalid destination location",
      "param": "destination",
      "location": "query"
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
  "message": "Unauthorized"
}
```

## Notes

- Ensure that the `Authorization` header is set to `Bearer <token>` when making the request.

# Maps Service Endpoints

## Get Coordinates Endpoint

### Description

This endpoint allows for retrieving the coordinates of a given address.

### HTTP Method

`GET`

### Endpoint

`/maps/get-coordinates`

### Query Parameters

- `address` (string, required): The address to get coordinates for.

### Responses

#### Success

- **Status Code**: 200 OK
- **Response Body**: A JSON object containing the coordinates.

#### Example Success Response

```json
{
  "ltd": 37.7749,
  "lng": -122.4194
}
```

#### Errors

- **Status Code**: 400 Bad Request
- **Response Body**: A JSON object containing an error message.

## Get Distance and Time Endpoint

### Description

This endpoint allows for calculating the distance and time between two locations.

### HTTP Method

`GET`

### Endpoint

`/maps/get-distance-time`

### Query Parameters

- `origin` (string, required): The starting location.
- `destination` (string, required): The ending location.

### Responses

#### Success

- **Status Code**: 200 OK
- **Response Body**: A JSON object containing the distance and time.

#### Example Success Response

```json
{
  "distance": {
    "text": "10 km",
    "value": 10000
  },
  "duration": {
    "text": "12 mins",
    "value": 720
  },
  "status": "OK"
}
```

#### Errors

- **Status Code**: 400 Bad Request
- **Response Body**: A JSON object containing an error message.

## Get Autocomplete Suggestions Endpoint

### Description

This endpoint allows for fetching autocomplete suggestions for a given input.

### HTTP Method

`GET`

### Endpoint

`/maps/get-suggestions`

### Query Parameters

- `input` (string, required): The input to get suggestions for.

### Responses

#### Success

- **Status Code**: 200 OK
- **Response Body**: A JSON object containing the suggestions.

#### Example Success Response

```json
{
  "results": [
    {
      "description": "San Francisco, CA, USA",
      "place_id": "ChIJIQBpAG2ahYAR_6128GcTUEo"
    }
  ],
  "status": "OK",
  "pagination": {
    "next_page": 2,
    "current_page": 1,
    "total_results": 100
  }
}
```

#### Errors

- **Status Code**: 400 Bad Request
- **Response Body**: A JSON object containing an error message.

# Socket Setup

## Description

This section describes the setup and usage of socket.io for real-time communication between the server and clients.

## Initialization

The socket.io server is initialized in the `socket.js` file and is configured to handle connections, disconnections, and custom events.

### Example Initialization

```javascript
const socketIo = require("socket.io");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log(`New client connected : ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`User ${userId} joined as ${userType}`);
      // ...existing code...
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      console.log(`User ${userId} updated to ${location}`);
      // ...existing code...
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected : ${socket.id}`);
    });
  });
}

module.exports = {
  initializeSocket,
};
```

## Events

### Join Event

This event is emitted by the client to join a specific room based on user type and ID.

- **Event Name**: `join`
- **Data**:
  ```json
  {
    "userId": "user_id",
    "userType": "user" // or "captain"
  }
  ```

### Update Location Event

This event is emitted by the captain to update their location.

- **Event Name**: `update-location-captain`
- **Data**:
  ```json
  {
    "userId": "captain_id",
    "location": {
      "ltd": 37.7749,
      "lng": -122.4194
    }
  }
  ```

### New Ride Event

This event is emitted by the server to notify captains of a new ride request.

- **Event Name**: `new-ride`
- **Data**:
  ```json
  {
    "event": "new-ride",
    "data": {
      // ride details
    }
  }
  ```

## Notes

- Ensure that the client is connected to the socket server and listening for the appropriate events.
