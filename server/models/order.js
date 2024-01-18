/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		static associate(models) {
			Order.belongsTo(models.Player, { foreignKey: "id" });
		}
	}
	Order.init(
		{
			PlayerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "PlayerId is required.",
					},
				},
			},
			order_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Order_Id is required.",
					},
					notEmpty: {
						args: true,
						msg: "Order_Id cannot be empty.",
					},
				},
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Status is required.",
					},
					notEmpty: {
						args: true,
						msg: "Status cannot be empty.",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Order",
		}
	);
	return Order;
};
