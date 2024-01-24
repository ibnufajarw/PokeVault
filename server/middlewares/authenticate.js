/** @format */

const { Player } = require("../models");
const { verifyToken } = require("../helpers/jwtHelper");

const authenticateUser = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (!token) {
			// console.log(token, "<<<token");
			throw { name: "JsonWebTokenError" };
		}

		const [bearer, accessToken] = token.split(" ");
		if (bearer !== "Bearer") {
			// console.log(bearer, "<<<bearer");
			throw { name: "AuthenticationError" };
		}

		const payload = verifyToken(accessToken);
		const user = await Player.findByPk(payload.id);
		if (!user) {
			// console.log(user, "<<<user");
			throw { name: "Unauthorized" };
		}
		req.user = {
			id: user.id,
			username: user.username,
			email: user.email,
			balance: user.balance,
		};

		next();
	} catch (error) {
		// console.log(error);
		next(error);
	}
};

module.exports = authenticateUser;
