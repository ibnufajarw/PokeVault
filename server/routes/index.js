/** @format */

const express = require("express");
const router = express.Router();
const playerRoutes = require("./playerRoutes");
const pokemonRoutes = require("./pokemonRoutes");
const myPokemonRoutes = require("./myPokemonRoute");
const orderRoutes = require("./orderRoute");

router.get("/", (req, res) => {
	res.json({ message: "Hello World" });
});

router.use("/players", playerRoutes);
router.use("/pokemons", pokemonRoutes);
router.use("/mypokemons", myPokemonRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
