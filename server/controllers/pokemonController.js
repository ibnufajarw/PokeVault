/** @format */

const { Pokemon } = require("../models");
const { Op } = require("sequelize");

class PokemonController {
	static async pokemonList(req, res, next) {
		try {
			const { name, type, sort, order, page = 1 } = req.query;
			const limitPerPage = 12;

			const queryOptions = {
				where: {},
				order: [],
				limit: limitPerPage,
				offset: (page - 1) * limitPerPage,
			};

			if (name || type) {
				const conditions = [];
				if (name) {
					conditions.push({ name: { [Op.iLike]: `%${name}%` } });
				}
				if (type) {
					conditions.push({ type: { [Op.iLike]: `%${type}%` } });
				}

				queryOptions.where[Op.or] = Object.assign({}, ...conditions);
			}

			if (sort === "name") {
				const orderType = order === "desc" ? "DESC" : "ASC";
				queryOptions.order.push([sort, orderType]);
			}

			const pokemonList = await Pokemon.findAll(queryOptions);

			if (pokemonList.length === 0) {
				throw { name: "NotFoundError" };
			}

			// console.log(pokemonList);
			res.status(200).json(pokemonList);
		} catch (error) {
			console.error(error);
			next(error);
		}
	}

	static async pokemonDetail(req, res, next) {
		try {
			const { id } = req.params;
			const pokemon = await Pokemon.findByPk(id);

			if (!pokemon) {
				throw { name: "NotFoundError" };
			}

			res.status(200).json(pokemon);
		} catch (error) {
			// console.error(error);
			next(error);
		}
	}
}

module.exports = PokemonController;
