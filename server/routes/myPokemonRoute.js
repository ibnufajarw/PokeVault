/** @format */

const express = require("express");
const router = express.Router();

const MyPokemonController = require("../controllers/myPokemonController");
const authenticate = require("../middlewares/authenticate");

router.get("/", authenticate, MyPokemonController.myPokemonList);
router.post("/gacha", authenticate, MyPokemonController.gachaPokemon);
router.delete("/:id", authenticate, MyPokemonController.deletePokemon);

module.exports = router;
