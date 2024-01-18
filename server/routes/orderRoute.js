/** @format */

const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const OrderController = require("../controllers/orderController");

router.post("/topup", authenticate, OrderController.createOrder);
router.post("/pay/:orderId", authenticate, OrderController.payOrder);

module.exports = router;
