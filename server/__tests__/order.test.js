/** @format */

const request = require("supertest");
const app = require("../app");

let accessToken;

const login = async () => {
	const response = await request(app).post("/player/login").send({
		email: "testuser@example.com",
		password: "testpassword",
	});

	accessToken = response.body.accessToken;
};

beforeAll(async () => {
	await login();
});

describe("OrderController Tests", () => {
	test("Create Order Scenario", async () => {
		const orderData = {
			amount: 100,
		};

		const response = await request(app)
			.post("/order/topup")
			.set("Authorization", `Bearer ${accessToken}`)
			.send(orderData);

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("token");
		expect(response.body).toHaveProperty("order");
		expect(response.body.order).toHaveProperty("PlayerId");
		expect(response.body.order).toHaveProperty("order_id");
		expect(response.body.order).toHaveProperty("status", "pending");
		expect(response.body.order).toHaveProperty("amount", 100);
	});

	test("Pay with matching OrderId Scenario", async () => {
		const orderData = {
			orderId: "your-order-id",
		};

		const response = await request(app)
			.post("/order/pay")
			.set("Authorization", `Bearer ${accessToken}`)
			.send(orderData);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("message", "Payment successful");
		expect(response.body).toHaveProperty("order");
		expect(response.body.order).toHaveProperty("status", "paid");
	});

	test("Get Pay the Order with Not Existing OrderId Scenario", async () => {
		const orderData = {
			orderId: "non-existing-order-id",
		};

		const response = await request(app)
			.post("/order/pay")
			.set("Authorization", `Bearer ${accessToken}`)
			.send(orderData);

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("message", "Not found");
	});
});
