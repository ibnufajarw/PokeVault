/** @format */

const { v4: uuidv4 } = require("uuid");
const MidtransClient = require("midtrans-client");
const { Order } = require("../models");

class OrderController {
	static async createOrder(req, res, next) {
		try {
			const { amount } = req.body;
			const orderId = uuidv4();
			const playerId = req.user;

			const snap = new MidtransClient.Snap({
				isProduction: false,
				serverKey: process.env.MIDTRANS_SERVER_KEY,
				// clientKey: process.env.MIDTRANS_CLIENT_KEY,
			});

			const payload = {
				transaction_details: {
					order_id: orderId,
					gross_amount: amount,
				},
				credit_card: {
					secure: true,
				},
			};

			const { token } = await snap.createTransactionToken(payload);

			const order = await Order.create({
				PlayerId: playerId,
				order_id: orderId,
				status: "pending",
				amount: amount,
			});

			res.status(201).json({ token, order_id: order.order_id });
		} catch (error) {
			next(error);
		}
	}

	static async payOrder(req, res, next) {
		try {
			const { orderId } = req.params;

			const snap = new MidtransClient.Snap({
				isProduction: false,
				serverKey: process.env.MIDTRANS_SERVER_KEY,
				// clientKey: process.env.MIDTRANS_CLIENT_KEY,
			});

			const order = await Order.findOne({
				where: { order_id: orderId },
			});

			if (!order) {
				throw { name: "NotFoundError" };
			}

			order.status = "paid";
			await order.save();

			res.status(200).json({ message: "Payment successful" });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = OrderController;
