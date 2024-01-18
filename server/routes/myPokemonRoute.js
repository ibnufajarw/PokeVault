/** @format */

const express = require("express");
const router = express.Router();

const MyPokemonController = require("../controllers/myPokemonController");
const authenticate = require("../middlewares/authenticate");

router.get("/", authenticate, MyPokemonController.myPokemonList);
router.post("/buy", authenticate, MyPokemonController.buyPokemon);
router.delete("/:id", authenticate, MyPokemonController.deletePokemon);

module.exports = router;
