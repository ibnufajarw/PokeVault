/** @format */

const express = require("express");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", routes);

// Server listening
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
