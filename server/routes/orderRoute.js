/** @format */

const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const OrderController = require("../controllers/orderController");

router.post("/topup", authenticate, OrderController.initiatePayment);
router.post("/pay", authenticate, OrderController.handlePaymentStatus);

module.exports = router;
