/** @format */

const errorHandler = (error, req, res, next) => {
	console.log(error, "<<< Error Handler");

	switch (error.name) {
		case "ValidationError":
		case "SequelizeValidationError":
		case "SequelizeUniqueConstraintError":
		case "ReferenceError":
		case "InsufficientBalanceError":
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
};

module.exports = errorHandler;
