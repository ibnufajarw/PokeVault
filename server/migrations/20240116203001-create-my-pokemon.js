/** @format */

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("MyPokemons", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			PlayerId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Players",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			PokemonId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Pokemons",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("MyPokemons");
	},
};
