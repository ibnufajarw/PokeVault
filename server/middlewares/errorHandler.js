/** @format */

const errorHandler = (error, req, res) => {
	// console.error(error, "<<< Error Handler");

	switch (error.name) {
		case "SequelizeValidationError":
		case "SequelizeUniqueConstraintError":
		case "ReferenceError":
			res.status(400).json({ message: error.errors[0].message });
			break;

		case "NotFoundError":
			res.status(404).json({ message: "Not found" });
			break;

		case "Unauthorized":
		case "AuthenticationError":
		case "JsonWebTokenError":
			res.status(401).json({ message: "Authentication failed" });
			break;

		case "ForbiddenError":
		case "AuthorizationError":
			res.status(403).json({ message: "Forbidden access" });
			break;

		default:
			res.status(500).json({ message: "Internal Server Error" });
			break;
	}

	res.status(statusCode).json({ message: message });
};

module.exports = errorHandler;
