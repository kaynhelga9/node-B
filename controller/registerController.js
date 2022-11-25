const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd) {
		return res.status(400).json({ message: "Missing username/password" });
	}
	// check for dupe users
	const duplicate = await User.findOne({ username: user }).exec();
	if (duplicate) return res.sendStatus(409);
	try {
		// encrypt password
		const hashed = await bcrypt.hash(pwd, 10);

		// create and store new user
		const result = await User.create({
			username: user,
			password: hashed,
		});
		console.log(result);

		res.status(201).json({ success: `new user ${user} created` });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { handleNewUser };
