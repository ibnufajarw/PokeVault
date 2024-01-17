/** @format */

const { Player, Pokemon, MyPokemon, sequelize } = require("../models");

class MyPokemonController {
	static async myPokemonList(req, res, next) {
		try {
			const PlayerId = req.user.id;

			const myPoke = await MyPokemon.findAll({
				where: { PlayerId },
				include: [
					{
						model: Pokemon,
						attributes: [
							"id",
							"name",
							"image",
							"attack",
							"defense",
							"hp",
							"speed",
							"level",
							"type",
							"rarity",
						],
					},
				],
			});

			if (myPoke.length === 0) {
				res.status(200).json([]);
			} else {
				res.status(200).json(myPoke);
			}
		} catch (error) {
			// console.error(error);
			next(error);
		}
	}

	static async buyPokemon(req, res, next) {
		const calculateGachaPrice = (rarity) => {
			switch (rarity) {
				case "Uncommon":
					return 3000;
				case "Rare":
					return 7000;
				case "Legendary":
					return 12000;
				default:
					return 1000;
			}
		};

		const getRandomRarity = () => {
			const rarities = ["Common", "Uncommon", "Rare", "Legendary"];
			const rarityProbabilities = [50, 25, 15, 10];
			const randomValue = Math.random() * 100;
			let cumulativeProbability = 0;

			for (let i = 0; i < rarities.length; i++) {
				cumulativeProbability += rarityProbabilities[i];
				if (randomValue <= cumulativeProbability) {
					return rarities[i];
				}
			}

			return rarities[rarities.length - 1];
		};

		const { id: PlayerId, balance } = req.user;

		try {
			const randomRarity = getRandomRarity();

			const selectedPokemon = await Pokemon.findOne({
				where: { rarity: randomRarity },
				order: sequelize.random(),
			});

			const gachaPrice = calculateGachaPrice(randomRarity);

			if (balance < gachaPrice) {
				throw { name: "InsufficientBalanceError" };
			}

			await MyPokemon.create({
				PlayerId,
				PokemonId: selectedPokemon.id,
			});

			await Player.decrement("balance", {
				by: gachaPrice,
				where: { id: PlayerId },
			});

			res.status(201).json({ message: "Gacha successful." });
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
}

module.exports = MyPokemonController;
