/** @format */

const { v4: uuidv4 } = require("uuid");
const midtransClient = require("midtrans-client");
const { Order, Player } = require("../models");

class OrderController {
	static async initiatePayment(req, res, next) {
		const playerId = req.user.id;
		const { amount } = req.body;
		try {
			const player = await Player.findByPk(playerId);
			if (!player) {
				throw { name: "NotFoundError" };
			}

			const paymentGateway = new midtransClient.Snap({
				isProduction: false,
				serverKey: process.env.MIDTRANS_SERVER_KEY,
			});

			const newOrderId = uuidv4();

			await Order.create({
				order_id: newOrderId,
				PlayerId: playerId,
				status: "pending",
				amount: amount,
			});

			const paymentParameters = {
				transaction_details: {
					order_id: newOrderId,
					gross_amount: amount,
				},
				customer_details: {
					username: player.username,
					email: player.email,
				},
			};

			const paymentResponse = await paymentGateway.createTransaction(
				paymentParameters
			);
			res.status(201).json(paymentResponse);
		} catch (error) {
			next(error);
		}
	}

	static async handlePaymentStatus(req, res) {
		const { order_id, transaction_status, fraud_status } = req.body;
		// console.log(req.body, "<< req body");

		try {
			const order = await Order.findOne({ where: { order_id } });
			if (!order) {
				throw { name: "NotFoundError" };
			}

			if (
				(transaction_status === "capture" && fraud_status === "accept") ||
				transaction_status === "settlement"
			) {
				await Order.update({ status: "completed" }, { where: { order_id } });

				const player = await Player.findByPk(order.PlayerId);
				if (player) {
					await Player.update(
						{ balance: player.balance + order.amount },
						{ where: { id: player.id } }
					);
				}
			} else if (
				transaction_status === "cancel" ||
				transaction_status === "deny" ||
				transaction_status === "expire"
			) {
				await Order.update({ status: "failed" }, { where: { order_id } });
			}

			res.status(200).send("Payment status updated");
		} catch (error) {
			next(error);
		}
	}
}

module.exports = OrderController;
