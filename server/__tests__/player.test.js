/** @format */

const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");

beforeAll(async () => {
	await sequelize.sync({ force: true });
});

afterAll(async () => {
	await sequelize.close();
});

describe("Player Controller Tests", () => {
	let accessToken;

	test("New Player Scenario", async () => {
		const response = await request(app).post("/player/register").send({
			username: "testuser",
			email: "testuser@example.com",
			password: "testpassword",
		});

		expect(response.statusCode).toBe(201);
		expect(response.body).toHaveProperty("message", "Register Successful");
		expect(response.body).toHaveProperty("username", "testuser");
		expect(response.body).toHaveProperty("email", "testuser@example.com");
	});

	test("Existing Player Scenario", async () => {
		const response = await request(app).post("/player/login").send({
			email: "testuser@example.com",
			password: "testpassword",
		});

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("accessToken");
		accessToken = response.body.accessToken;
	});

	test("Player Detail Scenario", async () => {
		const response = await request(app)
			.get("/player/profile")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("username", "testuser");
		expect(response.body).toHaveProperty("email", "testuser@example.com");
	});

	test("Player Detail without Token Scenario", async () => {
		const response = await request(app).get("/player/profile");

		expect(response.statusCode).toBe(401);
		expect(response.body).toHaveProperty("message", "Authentication failed");
	});

	test("Player Detail with Invalid Token Scenario", async () => {
		const response = await request(app)
			.get("/player/profile")
			.set("Authorization", "Bearer invalidtoken");

		expect(response.statusCode).toBe(401);
		expect(response.body).toHaveProperty("message", "Authentication failed");
	});
});
