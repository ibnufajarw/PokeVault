/** @format */

const { Pokemon } = require("../models");
const { Op } = require("sequelize");

class PokemonController {
	static async pokemonList(req, res, next) {
		try {
			const { name, type, sort, order, page = 1 } = req.query;
			const limitPerPage = 100;

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

			const pokemons = await Pokemon.findAndCountAll(queryOptions);
			const totalPages = Math.ceil(pokemons.count / limitPerPage);

			res.status(200).json({ pokemons: pokemons.rows, totalPages });
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
				throw { name: "NotFoundError", message: "Not found" };
			}

			res.status(200).json(pokemon);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = PokemonController;
