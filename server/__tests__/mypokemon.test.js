/** @format */

const request = require("supertest");
const app = require("../app");
const { Player, MyPokemon, Pokemon, sequelize } = require("../models");

const seedDatabase = async () => {
	await Player.create({
		username: "testuser",
		email: "testuser@example.com",
		password: "testpassword",
	});

	await Pokemon.create({
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
	});
};

const cleanupDatabase = async () => {
	await Player.destroy({ where: {} });
	await MyPokemon.destroy({ where: {} });
	await Pokemon.destroy({ where: {} });
};

beforeAll(async () => {
	await sequelize.sync({ force: true });
	await seedDatabase();
});

afterAll(async () => {
	await cleanupDatabase();
	await sequelize.close();
});

describe("MyPokemon Controller Tests", () => {
	let accessToken;
	let pokemonId;

	beforeAll(async () => {
		const response = await request(app).post("/player/login").send({
			email: "testuser@example.com",
			password: "testpassword",
		});
		accessToken = response.body.accessToken;

		const pokemon = await Pokemon.findOne({ where: { name: "bulbasaur" } });
		pokemonId = pokemon.id;
	});

	test("Get MyPokemon List Scenario", async () => {
		const response = await request(app)
			.get("/mypokemon")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toBeInstanceOf(Array);

		if (response.body.length > 0) {
			const myPokemon = response.body[0];
			expect(myPokemon).toHaveProperty("id");
			expect(myPokemon).toHaveProperty("PlayerId");
			expect(myPokemon).toHaveProperty("PokemonId");
			expect(myPokemon).toHaveProperty("createdAt");
			expect(myPokemon).toHaveProperty("updatedAt");
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
			.post("/mypokemon/gacha")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("message", "Gacha successful.");
		expect(response.body).toHaveProperty("acquiredPokemon");

		if (response.body.acquiredPokemon) {
			const acquiredPokemon = response.body.acquiredPokemon;
			expect(acquiredPokemon).toHaveProperty("id");
			expect(acquiredPokemon).toHaveProperty("name");
		}
	});

	test("Delete MyPokemon Scenario", async () => {
		const myPokemonId = 1;

		const response = await request(app)
			.delete(`/mypokemon/${myPokemonId}`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("message", "Deleted");

		expect(response.body).toHaveProperty("deletedMyPokemon");

		if (response.body.deletedMyPokemon) {
			const deletedMyPokemon = response.body.deletedMyPokemon;
			expect(deletedMyPokemon).toHaveProperty("id");
			expect(deletedMyPokemon).toHaveProperty("PlayerId");
			expect(deletedMyPokemon).toHaveProperty("PokemonId");
			expect(deletedMyPokemon).toHaveProperty("createdAt");
			expect(deletedMyPokemon).toHaveProperty("updatedAt");
			expect(deletedMyPokemon).toHaveProperty("Pokemon");
		}
	});
});
