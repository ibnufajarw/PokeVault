# Pokevault API Documentation

### Description

Pokevault is an API for managing a collection of Pokemon, allowing players to buy, sell, and view details about their Pokemon. This documentation provides details on the available endpoints and how to use them.

---

### Getting Started

To get started with the Pokevault API, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up the database by running migrations with `npm run migrate`.
4. Start the server with `npm start`.
5. Explore the API endpoints detailed below.

---

### Endpoint List

##### Player Endpoint:

- `POST /players/register`
- `POST /players/login`
- `POST /players/profile`

##### Pokemon Endpoint:

- `GET /pokemons`
- `GET /pokemons/:id`

##### My Pokemon Endpoint:

- `GET /mypokemons`
- `POST /mypokemons/gacha`
- `DELETE /mypokemons/:id`

##### Order Endpoint:

- `POST /orders/topup`
- `POST /orders/pay`

---

### Player Endpoint

##### Get /players/profile

Profile information of the authenticated player.

> Headers:
> Authorization: Bearer token

```json
{
  "accessToken":"example_token"
}
```

Success Response:

> Response: (200 - OK)

```json
{
    "id": 1,
    "username": "Example",
    "email": "player@example.com",
    "balance": 0,
    "createdAt": "2024-01-18T14:08:21.561Z",
    "updatedAt": "2024-01-19T05:33:04.735Z"
}
```

Error Response:

> Response: (404 - Not Found)

```json
{
  "message": "NotFoundError",
}
```

##### POST /players/register

Register new player for player authentication.

> Body:

```json
{
    "username": "Example",
    "email": "player@example.com",
    "password": "12345"
}
```

Success Response:

> Response: (201 - Created)

```json
{
    "message": "Register Successful",
    "username": "example",
    "email": "player@example.com"
}
```

Error Response:

> Response: (400 - Bad Request)

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Password is required"
}
```

> Response: (401 - Unauthorized)

```json
{
  "message": "Email already registered"
}
```

##### POST /players/login

Player authentication.

> Body:

```json
{
    "email": "player@example.com",
    "password": "12345"
}
```

Success Response:

> Response: (200 - OK)

```json
{
  "accessToken":"example_token"
}
```

Error Response:

> Response: (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}

```

> Response: (401 - Unauthorized)

```json
{
  "message": "Authentication failed"
}
```

## Pokemon Endpoint

##### GET /pokemons

Get a list of all Pokemon.

Success Response:

> Response: (200 - OK)

```json
"pokemons":
    [
        {
            "id": 1,
            "name": "bulbasaur",
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            "attack": 49,
            "defense": 49,
            "hp": 45,
            "speed": 45,
            "level": 1,
            "type": "grass, poison",
            "rarity": "Uncommon",
            "createdAt": "2024-01-18T04:26:01.787Z",
            "updatedAt": "2024-01-18T04:26:01.787Z"
        },
    ]
```

##### GET /pokemons/:id

Display Pokemon details based `id`.

> Params:

```json
{
    "id": integer
}
```

Success Response:

> Response: (200 - OK)

```json
{
    "id": 1,
    "name": "bulbasaur",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "attack": 49,
    "defense": 49,
    "hp": 45,
    "speed": 45,
    "level": 1,
    "type": "grass, poison",
    "rarity": "Uncommon",
    "createdAt": "2024-01-18T04:26:01.787Z",
    "updatedAt": "2024-01-18T04:26:01.787Z"
}
```

Error Response:

> Response: (404 - Not found)

```json
{
  "message": "Not found"
}
```

## MyPokemon Endpoint

##### GET /mypokemons

Get the Pokemon that the player has.

> Headers:
> Authorization: Bearer token

```json
{
  "accessToken":"example_token"
}
```

Success Response:

> Response: (200 - OK)

- If Don't have any Pokemon
```json
[]
```

- If Have any Pokemon
```json
[
    {
        "PlayerId": 2,
        "PokemonId": 49,
        "Pokemon": {
            "name": "venomoth",
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png",
            "attack": 65,
            "defense": 60,
            "hp": 70,
            "speed": 90,
            "level": 1,
            "type": "bug, poison",
            "rarity": "Rare"
        }
    },
    {
        "PlayerId": 2,
        "PokemonId": 52,
        "Pokemon": {
            "name": "meowth",
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png",
            "attack": 45,
            "defense": 35,
            "hp": 40,
            "speed": 90,
            "level": 1,
            "type": "normal",
            "rarity": "Uncommon"
        }
    },
]
```

##### POST /mypokemons/gacha

Gacha to get Pokemon randomly.

> Headers:
> Authorization: Bearer token

```json
{
  "accessToken":"example_token"
}
```

Success Response:

> Response: (201 - Created)

```json
{
    "message": "Gacha successful.",
    "newBalance": 0,
    "acquiredPokemon": {
        "id": 648,
        "name": "meloetta-aria",
        "attack": 77,
        "defense": 77,
        "hp": 100,
        "speed": 90,
        "type": "normal, psychic",
        "rarity": "Legendary"
    }
}
```

Error Response:

> Response: (400 - Bad Request)

```json
{
  "message": "InsufficientBalanceError"
}
```

> Response: (404 - Not found)

```json
{
  "message": "Not found"
}
```

##### DELETE /mypokemons/:id

Delete owned pokemon based on `id`.

> Headers:
> Authorization: Bearer token

```json
{
  "accessToken":"example_token"
}
```
> Params:

```json
{
  "id": integer
}
```

Success Response:

> Response: (201 - Created)

```json
{
    "message": "Deleted"
}
```

Error Response:

> Response: (404 - Not found)

```json
{
  "message": "Not found"
}
```

### Order Endpoint

##### POST /orders/topup

Do an initial Midtrans to make an order for how much balance want to add to the player.

> Headers:
> Authorization: Bearer token

```json
{
  "accessToken":"example_token"
}
```
> body:

```json
{
  "amount": integer
}
```

Success Response:

> Response: (200 - OK)

```json
{
    "token": "example_token_order",
    "redirect_url": "example_midtrans_url"
}
```

Error Response:

> Response: (400 - Bad Request)

```json
{
  "message": "Amount is required"
}
```

##### POST /orders/pay

Make status and balance changes after Midtrans payments based on `token`.

> Headers:
> Authorization: Bearer token

```json
{
  "accessToken":"example_token"
}
```
> body:

```json
{
  "token": "example_token_order",
  "transaction_status": "capture",
  "fraud_status": "accept"
}
```

Success Response:

> Response: (201 - Created)

```json
{
    "message": "Payment status updated"
}
```
---

## Global Error

> Response: (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```

---

### Dependencies

The project uses the following dependencies:

- Express
- Sequelize
- Bcrypt
- Jsonwebtoken
- Jest & Supertest (for testing)
- Axios (for Poke API integration)

Install them using `npm install`.

---

### External APIs

##### Poke API

> The Poke API is used to fetch details about Pokemon, including names, images, stats, and more. Visit the [Poke API documentation](https://pokeapi.co/docs/v2) for more information.

##### Midtrans

> Midtrans is integrated to handle payment transactions for player balance top-up. Visit the [Midtrans documentation](https://docs.midtrans.com) for more information on integrating Midtrans into your application.