/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class MyPokemon extends Model {
		static associate(models) {
			MyPokemon.belongsTo(models.Player, { foreignKey: "PlayerId" });
			MyPokemon.belongsTo(models.Pokemon, { foreignKey: "PokemonId" });
		}
	}
	MyPokemon.init(
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
		},
		{
			sequelize,
			modelName: "MyPokemon",
		}
	);
	return MyPokemon;
};
