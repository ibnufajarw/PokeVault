/** @format */

"use strict";

const axios = require("axios");

module.exports = {
	async up(queryInterface, Sequelize) {
		try {
			const pokemonCount = 1025;

			for (let i = 1; i <= pokemonCount; i++) {
				const response = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/${i}`
				);
				const pokemonDetails = response.data;

				const { name, sprites, stats, types } = pokemonDetails;

				const totalStats = stats.reduce((sum, stat) => sum + stat.base_stat, 0);
				const averageStats = totalStats / stats.length;
				const rarity =
					averageStats > 80
						? "Legendary"
						: averageStats > 60
						? "Rare"
						: averageStats > 40
						? "Uncommon"
						: "Common";

				const pokemonTypes = types.map((type) => type.type.name).join(", ");

				await queryInterface.bulkInsert("Pokemons", [
					{
						name,
						image: sprites.front_default,
						attack: stats[1].base_stat,
						defense: stats[2].base_stat,
						hp: stats[0].base_stat,
						speed: stats[5].base_stat,
						level: 1,
						type: pokemonTypes,
						rarity,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				]);
			}
		} catch (error) {
			console.error(error.message);
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Pokemons", null, {
			truncate: true,
			cascade: true,
			resetIdentity: true,
		});
	},
};
