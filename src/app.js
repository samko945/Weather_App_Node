const path = require("path");
const express = require("express");
const hbs = require("hbs"); //handlebars
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Samuel",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
		name: "Samuel",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		message: "Read some answers to our frequently asked questions.",
		name: "Samuel",
	});
});

app.get("/weather", (req, res) => {
	const place = req.query.place;
	if (!place) {
		return res.send({ error: "You must provide a place name." });
	}
	geocode(place, (error, { lat, lon, location } = {}) => {
		if (error) return res.send({ error });

		forecast(lat, lon, (error, forecastData) => {
			if (error) return res.send({ error });

			res.send({
				forecast: forecastData,
				location,
			});
		});
	});
});

app.get("/help/*", (req, res) => {
	res.render("error", {
		title: "Help",
		message: "Help article not found.",
		name: "Samuel",
	});
});

app.get("*", (req, res) => {
	res.render("error", {
		title: "404",
		message: "Page not found.",
		name: "Samuel",
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000.");
});
