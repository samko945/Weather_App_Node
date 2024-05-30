const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const search = process.argv[2];

if (!search) {
	console.log("Please name a location");
} else {
	geocode(search, (error, { lat, lon, location }) => {
		if (error) return console.log("geocode error: ", error);

		forecast(lat, lon, (error, forecastData) => {
			if (error) return console.log("forecast error: ", error);

			console.log(location);
			console.log(forecastData);
		});
	});
}
