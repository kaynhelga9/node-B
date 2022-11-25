require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const { logEvents } = require("./middleware/log");
const { logger } = require("./middleware/log");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("././config/corsOption");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const PORT = process.env.PORT | 8000;

connectDB();

const app = express();

// custom middleware logger
app.use(logger);

app.use(cors(corsOptions));

// handle urlencoded data
app.use(express.urlencoded({ extended: false }));

// json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// static
app.use("/", express.static(path.join(__dirname, "/public")));

// ROUTING
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT); // only verify after this pathing
app.use("/employees", require("./routes/api/employees"));

app.all("/*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ error: "404 Not Found" });
	} else {
		res.type("txt").send("404 Not Found");
	}
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
	console.log("connected to mongodb");
	app.listen(PORT, () => {
		console.log(`Server running on ${PORT}`);
	});
});
