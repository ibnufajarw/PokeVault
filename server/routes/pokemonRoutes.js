/** @format */

const express = require("express");
const router = express.Router();

const PokemonController = require("../controllers/pokemonController");
const authenticate = require("../middlewares/authenticate");

router.get("/", authenticate, PokemonController.pokemonList);
router.get("/:id", authenticate, PokemonController.pokemonDetail);

module.exports = router;
