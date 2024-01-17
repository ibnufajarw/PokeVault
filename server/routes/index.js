/** @format */

const express = require("express");
const router = express.Router();
const playerRoutes = require("./playerRoutes");
const pokemonRoutes = require("./pokemonRoutes");
const myPokemonRoutes = require("./myPokemonRoute");

router.get("/", (req, res) => {
	res.json({ message: "Hello World" });
});

router.use("/player", playerRoutes);
router.use("/pokemon", pokemonRoutes);
router.use("/mypokemon", myPokemonRoutes);
// router.use("/order", orderRoutes);

module.exports = router;
