/** @format */

const express = require("express");
const router = express.Router();

const PokemonController = require("../controllers/pokemonController");

router.get("/", PokemonController.pokemonList);
router.get("/:id", PokemonController.pokemonDetail);

module.exports = router;
