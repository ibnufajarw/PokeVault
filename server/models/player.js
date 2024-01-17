/** @format */

"use strict";
const { Model } = require("sequelize");
const bcrypt = require("../helpers/bcryptHelper");

module.exports = (sequelize, DataTypes) => {
	class Player extends Model {
		static associate(models) {
			Player.hasMany(models.MyPokemon, { foreignKey: "UserId" });
			Player.hasMany(models.Order, { foreignKey: "UserId" });
		}
	}
	Player.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Username is required.",
					},
					notEmpty: {
						args: true,
						msg: "Username cannot be empty.",
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notNull: {
						args: true,
						msg: "Email is required.",
					},
					notEmpty: {
						args: true,
						msg: "Email cannot be empty.",
					},
					isEmail: {
						args: true,
						msg: "Invalid email format.",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Password is required.",
					},
					notEmpty: {
						args: true,
						msg: "Password cannot be empty.",
					},
				},
			},
			balance: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			modelName: "Player",
			hooks: {
				beforeCreate: async (player) => {
					player.password = await bcrypt.hashPassword(player.password);
				},
			},
		}
	);
	return Player;
};
