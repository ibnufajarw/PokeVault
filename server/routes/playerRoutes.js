/** @format */

const express = require("express");
const router = express.Router();

const PlayerController = require("../controllers/playerController");
const authenticate = require("../middlewares/authenticate");

router.post("/register", PlayerController.register);
router.post("/login", PlayerController.login);
router.get("/profile", authenticate, PlayerController.getPlayerDetail);

module.exports = router;
