/** @format */

const { Player } = require("../models");
const { comparePassword } = require("../helpers/bcryptHelper");
const { generateToken } = require("../helpers/jwtHelper");
const { OAuth2Client } = require("google-auth-library");

class PlayerController {
	static async register(req, res, next) {
		let { username, email, password } = req.body;
		try {
			const existingUser = await Player.findOne({ where: { email } });
			if (existingUser) {
				throw { name: "SequelizeUniqueConstraintError" };
			}

			const player = await Player.create({
				username,
				email,
				password,
			});
			res.status(201).json({
				message: "Register Successful",
				username: player.username,
				email: player.email,
			});
		} catch (error) {
			// console.log(error);
			next(error);
		}
	}

	static async login(req, res, next) {
		const { email, password } = req.body;
		try {
			if (!email || !password) {
				throw { name: "Unauthorized" };
			}

			const player = await Player.findOne({ where: { email } });

			if (!player || !comparePassword(password, player.password)) {
				throw { name: "AuthenticationError" };
			}
			// res.status(200).json(player);
			const accessToken = generateToken({ id: player.id });
			res.status(200).json({ accessToken });
		} catch (error) {
			// console.error(error);
			next(error);
		}
	}

	static async authenticateWithGoogle(req, res, next) {
		const googleToken = req.headers["google-token"];
		const oauthClient = new OAuth2Client();

		try {
			const verificationTicket = await oauthClient.verifyIdToken({
				idToken: googleToken,
				audience: process.env.GOOGLE_CLIENT_ID,
			});

			const userInfo = verificationTicket.getPayload();
			const userEmail = userInfo.email;
			// console.log(userInfo);

			let account = await User.findOne({ where: { email: userEmail } });
			if (!account) {
				account = await User.create(
					{
						username: userInfo.username,
						email: userEmail,
						password: `example-password-${Date.now()}`,
					},
					{ hooks: false }
				);
			}

			const accessToken = generateToken({ id: account.id });
			res
				.status(200)
				.json({ accessToken, id: account.id, email: account.email });
		} catch (error) {
			next(error);
		}
	}

	static async playerDetail(req, res, next) {
		try {
			const PlayerId = req.user.id;

			const player = await Player.findByPk(PlayerId, {
				attributes: { exclude: ["password"] },
			});

			if (!player) {
				throw { name: "NotFoundError" };
			}

			res.status(200).json(player);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = PlayerController;
