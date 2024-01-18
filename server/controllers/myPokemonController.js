/** @format */

const { Player, Pokemon, MyPokemon } = require("../models");

class MyPokemonController {
	static async myPokemonList(req, res, next) {
		try {
			const { id: PlayerId } = req.user;

			const myPokemonList = await MyPokemon.findAll({
				where: { PlayerId },
				include: {
					model: Pokemon,
				},
			});

			if (myPokemonList.length === 0) {
				res.status(200).json([]);
			} else {
				res.status(200).json(myPokemonList);
			}
		} catch (error) {
			// console.error(error);
			next(error);
		}
	}

	static async buyPokemon(req, res, next) {
		const gachaPrice = 10000;

		const { id: PlayerId, balance } = req.user;

		try {
			if (balance < gachaPrice) {
				throw { name: "InsufficientBalanceError" };
			}

			const totalPokemonCount = await Pokemon.count();
			const randomPokemonId = Math.floor(Math.random() * totalPokemonCount) + 1;

			const selectedPokemon = await Pokemon.findByPk(randomPokemonId);

			if (!selectedPokemon) {
				throw { name: "NotFoundError" };
			}

			await MyPokemon.create({
				PlayerId,
				PokemonId: selectedPokemon.id,
				name: selectedPokemon.name,
				attack: selectedPokemon.attack,
				defense: selectedPokemon.defense,
				hp: selectedPokemon.hp,
				speed: selectedPokemon.speed,
				type: selectedPokemon.type,
				rarity: selectedPokemon.rarity,
			});

			// Decrement player's balance
			await Player.decrement("balance", {
				by: gachaPrice,
				where: { id: PlayerId },
			});

			res.status(201).json({
				message: "Gacha successful.",
				acquiredPokemon: {
					id: selectedPokemon.id,
					name: selectedPokemon.name,
					attack: selectedPokemon.attack,
					defense: selectedPokemon.defense,
					hp: selectedPokemon.hp,
					speed: selectedPokemon.speed,
					type: selectedPokemon.type,
					rarity: selectedPokemon.rarity,
				},
			});
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
}

module.exports = MyPokemonController;
