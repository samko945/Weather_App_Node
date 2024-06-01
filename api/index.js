require("dotenv").config();
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Define routes
app.get("/", (req, res) => {
	res.render("index", { title: "Weather App", name: "Samuel" });
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About", name: "Samuel" });
});

app.get("/help", (req, res) => {
	res.render("help", { title: "Help", message: "FAQs", name: "Samuel" });
});

app.get("/weather", (req, res) => {
	const place = req.query.place;
	if (!place) return res.send({ error: "You must provide a place name." });

	geocode(place, (error, { lat, lon, location } = {}) => {
		if (error) return res.send({ error });
		forecast(lat, lon, (error, forecastData) => {
			if (error) return res.send({ error });
			res.send({ forecast: forecastData, location });
		});
	});
});

app.get("/help/*", (req, res) => {
	res.render("error", { title: "Help", message: "Help article not found.", name: "Samuel" });
});

app.get("*", (req, res) => {
	res.render("error", { title: "404", message: "Page not found.", name: "Samuel" });
});

app.listen(process.env.PORT || 3456, () => {
	console.log(`Server is up on port ${process.env.PORT || 3456}.`);
});

module.exports = app;
