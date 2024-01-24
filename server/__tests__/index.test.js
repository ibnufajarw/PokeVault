/** @format */

const request = require("supertest");
const app = require("../app");
const { Player, MyPokemon, Pokemon, sequelize } = require("../models");

const seedDatabase = async () => {
	await Player.create({
		username: "testuser",
		email: "testuser@example.com",
		password: "testpassword",
		balance: 10000,
	});

	await Pokemon.create(
		{
			id: 1,
			name: "bulbasaur",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
			attack: 49,
			defense: 49,
			hp: 45,
			speed: 45,
			level: 1,
			type: "grass, poison",
			rarity: "Uncommon",
		},
		{
			id: 2,
			name: "pikachu",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png",
			attack: 40,
			defense: 49,
			hp: 45,
			speed: 45,
			level: 1,
			type: "poison",
			rarity: "Uncommon",
		}
	);
};

const cleanupDatabase = async () => {
	await Player.destroy({ where: {} });
	await MyPokemon.destroy({ where: {} });
	await Pokemon.destroy({ where: {} });
};

beforeAll(async () => {
	await seedDatabase();
});

afterAll(async () => {
	await cleanupDatabase();
});

describe("Player Controller Tests", () => {
	let accessToken;

	beforeAll(async () => {
		const loginResponse = await request(app).post("/players/login").send({
			email: "testuser@example.com",
			password: "testpassword",
		});
		accessToken = loginResponse.body.accessToken;
	});

	test("New Player Scenario", async () => {
		const response = await request(app).post("/players/register").send({
			username: "newuser",
			email: "newuser@example.com",
			password: "testpassword",
		});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("message", "Register Successful");
		expect(response.body).toHaveProperty("username", "newuser");
		expect(response.body).toHaveProperty("email", "newuser@example.com");
	});

	test("Player Registration with Existing Email", async () => {
		const response = await request(app).post("/players/register").send({
			username: "anotheruser",
			email: "testuser@example.com",
			password: "anotherpassword",
		});

		expect(response.status).toBe(400);
	});

	test("Player Registration with Invalid Data", async () => {
		const response = await request(app).post("/players/register").send({
			username: "",
			email: "invaliduser@example.com",
			password: "invalidpassword",
		});

		expect(response.status).toBe(400);
	});

	test("Existing Player Scenario", async () => {
		const response = await request(app).post("/players/login").send({
			email: "testuser@example.com",
			password: "testpassword",
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("accessToken");
		accessToken = response.body.accessToken;
	});

	test("Fetch Player Details Successfully", async () => {
		const playerId = 1;
		const response = await request(app).post(`/players/${playerId}`).send({
			email: "testuser@example.com",
			password: "testpassword",
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", playerId);
	});

	test("Player Detail Scenario", async () => {
		const response = await request(app)
			.get("/players/profile")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("username", "testuser");
		expect(response.body).toHaveProperty("email", "testuser@example.com");
		expect(response.body).toHaveProperty("balance", 10000);
	});

	test("Player Detail without Token Scenario", async () => {
		const response = await request(app).get("/players/profile");

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("message", "Authentication failed");
	});

	test("Player Detail with Invalid Token Scenario", async () => {
		const response = await request(app)
			.get("/players/profile")
			.set("Authorization", "Bearer invalidtoken");

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("message", "Authentication failed");
	});
});

describe("Pokemon Controller Tests", () => {
	test("Get Pokemon List Scenario", async () => {
		const response = await request(app).get("/pokemons");

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("pokemons");
		expect(response.body).toHaveProperty("totalPages");
		expect(Array.isArray(response.body.pokemons)).toBeTruthy();
		expect(response.body.pokemons).toHaveLength(1);

		for (const pokemon of response.body.pokemons) {
			expect(pokemon.name).toBeDefined();
			expect(pokemon.attack).toBeDefined();
			expect(pokemon.defense).toBeDefined();
			expect(pokemon.hp).toBeDefined();
			expect(pokemon.speed).toBeDefined();
			expect(pokemon.level).toBeDefined();
			expect(pokemon.type).toBeDefined();
			expect(pokemon.rarity).toBeDefined();
		}
	});

	test("Get Pokemon Detail Scenario", async () => {
		const pokemonId = 1;

		const response = await request(app).get(`/pokemons/${pokemonId}`);

		expect(response.status).toBe(200);
		expect(response.body.name).toBe("bulbasaur");
		expect(response.body.attack).toBeDefined();
		expect(response.body.defense).toBeDefined();
		expect(response.body.hp).toBeDefined();
		expect(response.body.speed).toBeDefined();
		expect(response.body.level).toBeDefined();
		expect(response.body.type).toBeDefined();
		expect(response.body.rarity).toBeDefined();
	});

	test("Get Not Existing Pokemon Detail Scenario", async () => {
		const nonExistentPokemonId = 10000100;

		const response = await request(app).get(
			`/pokemons/${nonExistentPokemonId}`
		);

		expect(response.status).toBe(404);
		expect(response.body.message).toBe("Not found");
	});
});

describe("Order Controller Tests", () => {
	let accessToken;

	beforeAll(async () => {
		const loginResponse = await request(app).post("/players/login").send({
			email: "testuser@example.com",
			password: "testpassword",
		});
		accessToken = loginResponse.body.accessToken;
	});

	test("Create Order Scenario", async () => {
		const orderData = {
			amount: 100,
		};

		const response = await request(app)
			.post("/orders/topup")
			.set("Authorization", `Bearer ${accessToken}`)
			.send(orderData);

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("token");
		expect(response.body).toHaveProperty(["redirect_url"]);
	});

	test("Handle Payment Status - Success", async () => {
		const paymentData = {
			order_id: "token",
			transaction_status: "settlement",
		};

		const response = await request(app).post("/orders/pay").send(paymentData);

		expect(response.status).toBe(200);
		expect(response.text).toEqual("Payment status updated");
	});
});

describe("MyPokemon Controller Tests", () => {
	let accessToken;

	beforeAll(async () => {
		const loginResponse = await request(app).post("/players/login").send({
			email: "testuser@example.com",
			password: "testpassword",
		});
		accessToken = loginResponse.body.accessToken;
	});

	test("Get MyPokemon List Scenario", async () => {
		const response = await request(app)
			.get("/mypokemons")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toBeInstanceOf(Array);

		if (response.body.length > 0) {
			const myPokemon = response.body[0];
			expect(myPokemon).toHaveProperty("PlayerId");
			expect(myPokemon).toHaveProperty("PokemonId");
			expect(myPokemon).toHaveProperty("Pokemon");

			const pokemon = myPokemon.Pokemon;
			expect(pokemon).toHaveProperty("name");
			expect(pokemon).toHaveProperty("image");
			expect(pokemon).toHaveProperty("attack");
			expect(pokemon).toHaveProperty("defense");
			expect(pokemon).toHaveProperty("hp");
			expect(pokemon).toHaveProperty("speed");
			expect(pokemon).toHaveProperty("level");
			expect(pokemon).toHaveProperty("type");
			expect(pokemon).toHaveProperty("rarity");
		}
	});

	test("Gacha Pokemon Scenario", async () => {
		const response = await request(app)
			.post("/mypokemons/gacha")
			.set("Authorization", `Bearer ${accessToken}`);

		if (response.status === 201) {
			expect(response.body).toHaveProperty("message", "Gacha successful.");
			expect(response.body).toHaveProperty("newBalance");
			expect(response.body).toHaveProperty("acquiredPokemon");
			const acquiredPokemon = response.body.acquiredPokemon;
			expect(acquiredPokemon).toHaveProperty("id");
			expect(acquiredPokemon).toHaveProperty("name");
			expect(acquiredPokemon).toHaveProperty("attack");
			expect(acquiredPokemon).toHaveProperty("defense");
			expect(acquiredPokemon).toHaveProperty("hp");
			expect(acquiredPokemon).toHaveProperty("speed");
			expect(acquiredPokemon).toHaveProperty("type");
			expect(acquiredPokemon).toHaveProperty("rarity");
		} else {
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("name", "InsufficientBalanceError");
		}
	});

	test("Delete MyPokemon Scenario", async () => {
		const detail = 1;
		const response = await request(app)
			.delete(`/mypokemons/${detail}`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Deleted");
	});
});
