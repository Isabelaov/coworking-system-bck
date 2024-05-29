# Coworking system backend

Backend of RIwi's coworking

- To run the project in development mode:
  `npm run start:dev`

## Endpoints

How to consume the endpoints?

1. Users

- POST create user
  `http://localhost:3000/api/users/register`

      Fields:

          email: string
          username: string
          birthDate: string (format yyyy-mm-dd)
          password: string
          gender: string
          phone: string

- POST user login
  `http://localhost:3000/api/auth/login`

      Fields:

          usernameOrEmail: string
          password: string

- PATCH verify email
  `http://localhost:3000/api/auth/email-verify/{token}`
