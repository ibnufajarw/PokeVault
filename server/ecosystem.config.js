/** @format */

module.exports = {
	apps: [
		{
			name: "instance-1",
			script: "./bin/www",
			env: {
				NODE_ENV: "production",
				PORT: 80,
				JWT_SECRET: "secret",
				GOOGLE_CLIENT_ID:
					"511330639928-qo2jmbbitgfc29s9g5rv1m99dc5oepo6.apps.googleusercontent.com",
				MIDTRANS_SERVER_KEY: "SB-Mid-server-eR2ake9z1MW5yI7xXf_3wIRJ",
				MIDTRANS_CLIENT_KEY: "SB-Mid-client-Q24YJuceQjZI-oNt",
				DATABASE_URL:
					"postgresql://postgres:EPSxNabe16!@db.molqcycqhyxvuhtqsueh.supabase.co:5432/postgres",
			},
		},
	],
};
