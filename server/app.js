/** @format */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3000;

const errorHandler = require("./middlewares/errorHandler");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use("/", routes);
app.use(errorHandler);

// Server listening
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
