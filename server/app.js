/** @format */

require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use("/", routes);

// Server listening
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
