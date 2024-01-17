/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Pokemon extends Model {
		static associate(models) {
			Pokemon.belongsToMany(models.Player, { through: models.MyPokemon });
		}
	}
	Pokemon.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Name is required.",
					},
					notEmpty: {
						args: true,
						msg: "Name cannot be empty.",
					},
				},
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Image is required.",
					},
					notEmpty: {
						args: true,
						msg: "Image cannot be empty.",
					},
				},
			},
			attack: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Attack is required.",
					},
					notEmpty: {
						args: true,
						msg: "Attack cannot be empty.",
					},
				},
			},
			defense: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Defense is required.",
					},
					notEmpty: {
						args: true,
						msg: "Defense cannot be empty.",
					},
				},
			},
			hp: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "HP is required.",
					},
					notEmpty: {
						args: true,
						msg: "HP cannot be empty.",
					},
				},
			},
			speed: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Speed is required.",
					},
					notEmpty: {
						args: true,
						msg: "Speed cannot be empty.",
					},
				},
			},
			level: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Level is required.",
					},
					notEmpty: {
						args: true,
						msg: "Level cannot be empty.",
					},
				},
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Type is required.",
					},
					notEmpty: {
						args: true,
						msg: "Type cannot be empty.",
					},
				},
			},
			rarity: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Rarity is required.",
					},
					notEmpty: {
						args: true,
						msg: "Rarity cannot be empty.",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Pokemon",
		}
	);
	return Pokemon;
};
