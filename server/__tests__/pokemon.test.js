/** @format */

const { Pokemon } = require("../models");
const request = require("supertest");
const app = require("../app");

const pokemonData = [
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
		createdAt: "2024-01-18T04:26:01.787Z",
		updatedAt: "2024-01-18T04:26:01.787Z",
	},
	{
		id: 2,
		name: "ivysaur",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
		attack: 62,
		defense: 63,
		hp: 60,
		speed: 60,
		level: 1,
		type: "grass, poison",
		rarity: "Rare",
		createdAt: "2024-01-18T04:26:02.554Z",
		updatedAt: "2024-01-18T04:26:02.554Z",
	},
];

let accessToken;

beforeAll(async () => {
	await Promise.all(
		pokemonData.map(async (data) => {
			await Pokemon.create(data);
		})
	);

	const response = await request(app).post("/player/login").send({
		email: "testuser@example.com",
		password: "testpassword",
	});

	accessToken = response.body.accessToken;
});

describe("Pokemon Controller Tests", () => {
	test("Get Pokemon List Scenario", async () => {
		if (!accessToken) {
			throw new Error("Access token not available");
		}

		const response = await request(app)
			.get("/pokemon")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(2);

		for (const pokemon of response.body) {
			expect(pokemon.name).toBeDefined();
			expect(pokemon.image).toBeDefined();
			expect(pokemon.attack).toBeDefined();
			expect(pokemon.defense).toBeDefined();
			expect(pokemon.hp).toBeDefined();
			expect(pokemon.speed).toBeDefined();
			expect(pokemon.level).toBeDefined();
			expect(pokemon.type).toBeDefined();
			expect(pokemon.rarity).toBeDefined();
			expect(pokemon.createdAt).toBeDefined();
			expect(pokemon.updatedAt).toBeDefined();
		}
	});

	test("Get Pokemon Detail Scenario", async () => {
		if (!accessToken) {
			throw new Error("Access token not available");
		}

		const pokemonId = 1;

		const response = await request(app)
			.get(`/pokemon/${pokemonId}`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(200);
		expect(response.body.name).toBe("bulbasaur");

		expect(response.body.image).toBeDefined();
		expect(response.body.attack).toBeDefined();
		expect(response.body.defense).toBeDefined();
		expect(response.body.hp).toBeDefined();
		expect(response.body.speed).toBeDefined();
		expect(response.body.level).toBeDefined();
		expect(response.body.type).toBeDefined();
		expect(response.body.rarity).toBeDefined();
		expect(response.body.createdAt).toBeDefined();
		expect(response.body.updatedAt).toBeDefined();
	});

	test("Get Not Existing Pokemon Detail Scenario", async () => {
		if (!accessToken) {
			throw new Error("Access token not available");
		}

		const nonExistentPokemonId = 999;

		const response = await request(app)
			.get(`/pokemon/${nonExistentPokemonId}`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(404);
		expect(response.body.message).toBe("Not found");
	});
});

afterAll(async () => {
	await Promise.all(
		pokemonData.map(async (data) => {
			await Pokemon.destroy({ where: { id: data.id } });
		})
	);
});
