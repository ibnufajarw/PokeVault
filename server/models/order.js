/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		static associate(models) {
			Order.belongsTo(models.Player, { foreignKey: "UserId" });
			Order.belongsTo(models.Pokemon, { foreignKey: "PokemonId" });
		}
	}
	Order.init(
		{
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "UserId is required.",
					},
				},
			},
			PokemonId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "PokemonId is required.",
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
