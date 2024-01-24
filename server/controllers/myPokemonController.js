/** @format */

const { Player, Pokemon, MyPokemon, sequelize } = require("../models");

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

			const formattedList = myPokemonList.map((entry) => ({
				PlayerId: entry.PlayerId,
				PokemonId: entry.PokemonId,
				Pokemon: {
					name: entry.Pokemon.name,
					image: entry.Pokemon.image,
					attack: entry.Pokemon.attack,
					defense: entry.Pokemon.defense,
					hp: entry.Pokemon.hp,
					speed: entry.Pokemon.speed,
					level: entry.Pokemon.level,
					type: entry.Pokemon.type,
					rarity: entry.Pokemon.rarity,
				},
			}));

			res.status(200).json(formattedList);
		} catch (error) {
			// console.log(error);
			next(error);
		}
	}

	static async gachaPokemon(req, res, next) {
		const gachaPrice = 5000;

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

			await Player.decrement("balance", {
				by: gachaPrice,
				where: { id: PlayerId },
			});

			res.status(201).json({
				message: "Gacha successful.",
				newBalance: balance - gachaPrice,
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
			// console.error(error);
			next(error);
		}
	}

	static async deletePokemon(req, res, next) {
		try {
			const { id } = req.params;
			const userId = req.user.id;

			const myPokemon = await MyPokemon.findOne({
				where: { id, PlayerId: userId },
			});

			if (!myPokemon) {
				throw { name: "NotFoundError" };
			}

			await myPokemon.destroy();

			res.status(200).json({ message: "Deleted" });
		} catch (error) {
			// console.log(error);
			next(error);
		}
	}
}

module.exports = MyPokemonController;
