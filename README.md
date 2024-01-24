# Pokevault API Documentation

## Description

Pokevault is an API for managing a collection of Pokemon, allowing players to buy, sell, and view details about their Pokemon. This documentation provides details on the available endpoints and how to use them.

## Getting Started

To get started with the Pokevault API, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up the database by running migrations with `npm run migrate`.
4. Start the server with `npm start`.
5. Explore the API endpoints detailed below.

## Player Endpoint

Get Player Profile
Get the profile information of the authenticated player.

URL: /player/profile
Method: GET
Headers:
Authorization: Bearer token
Success Response:
Code: 200
Content:

```
{
  "id": "player123",
  "username": "example_player",
  "email": "player@example.com",
  "balance": 100000
}
```
Error Response:
Code: 401 Unauthorized
Content:
```
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```
Code: 500 Internal Server Error
Content:
```
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred while processing the request"
}
```

## Pokemon Endpoint

...

## MyPokemon Endpoint

...

## Order Endpoint

...

## Additional Notes

### Authenticate

...

### Search

...

### Sort

...

### Pagination

...

### Error Handler

...

### Dependencies

The project uses the following dependencies:

- Express
- Sequelize
- Bcrypt
- Jsonwebtoken
- Supertest (for testing)
- Axios (for Poke API integration)

Install them using `npm install`.

## External APIs

### Poke API

The Poke API is used to fetch details about Pokemon, including names, images, stats, and more. Visit the [Poke API documentation](https://pokeapi.co/docs/v2) for more information.

### Midtrans

Midtrans is integrated to handle payment transactions for player balance top-up. Visit the [Midtrans documentation](https://docs.midtrans.com) for more information on integrating Midtrans into your application.

