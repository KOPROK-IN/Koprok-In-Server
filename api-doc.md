# KOPROK-IN

List of available endpoints:
- `POST /register`
- `POST /login`
- `PATCH /`
- `GET /`

### POST /register

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:
- status 201

```json
{
  "message": "Register Success",
  "id": "integer",
  "name": "string",
  "email": "string",
  "money": "integer"
}
```

Error Response
- 400 bad request
- 500 internal server error

### POST /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status 200

```json
{
  "access_token" : "string"
}
```

Error Response
- 400 bad request
- 500 internal server error

### PATCH /

- data:

```json
{
  "gamblingMoney": "integer"
}
```

Response:

- status 200

```json
{
  "id": "string",
  "name": "string",
  "money": "integer"
}
```

Error Response
- 400 bad request
- 404 Error Not Found
- 500 internal server error

### GET /

BELUM DILENGKAPI <<<<<<<<<<<>>>>>>>>>>>

### ERROR RESPONSE DETAIL

- 400 Bad Request / Validation Error

```json
{
    "errors": [
        <"information about validation error">
    ]
}
```

- 401 Unauthorized


```json
{
  "error": "Invalid token"
}
```

- 404 Error Not Found

```json
{
  "error": "Error Not Found"
}
```
- 500 Internal Server Error

```json
{ 
    "error": "Internal Server Error"
}
```