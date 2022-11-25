// cross origin resource sharing
const whitelist = ["http://localhost:8000"]; //domains to allow access to app

const corsOptions = {
	origin: (origin, callback) => {
		if ((whitelist.indexOf(origin) !== -1) | !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed cors"));
		}
	},
	optionsSuccessStatus: 200,
};

module.exports = corsOptions;
