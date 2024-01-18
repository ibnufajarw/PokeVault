/** @format */

const { v4: uuidv4 } = require("uuid");
const MidtransClient = require("midtrans-client");
const { Order, Player } = require("../models");

class OrderController {
	static async createOrder(req, res, next) {
		try {
			const { amount } = req.body;

			const orderId = uuidv4();
			const playerId = req.user.id;

			const snap = new MidtransClient.Snap({
				isProduction: false,
				serverKey: process.env.MIDTRANS_SERVER_KEY,
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

			const token = await snap.createTransaction(payload);

			console.log({
				PlayerId: playerId,
				order_id: orderId,
				status: "pending",
				amount: amount,
			});

			const order = await Order.create({
				PlayerId: playerId,
				order_id: orderId,
				status: "pending",
				amount: amount,
			});

			res.status(201).json({ token, order });
		} catch (error) {
			next(error);
		}
	}

	static async payOrder(req, res, next) {
		try {
			const { orderId } = req.params;

			const order = await Order.findOne({
				where: { order_id: orderId },
			});

			if (!order) {
				throw { name: "NotFoundError", message: "Order not found" };
			}

			const user = await Player.findByPk(req.user.id);
			if (!user) {
				throw { name: "NotFoundError", message: "User not found" };
			}

			await user.update({ balance: user.balance + order.amount });
			order.status = "paid";
			await order.save();

			res.status(200).json({ message: "Payment successful" });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = OrderController;
