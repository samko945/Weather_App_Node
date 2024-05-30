const request = require("postman-request");

const url =
	"http://api.weatherstack.com/current?access_key=9458e43dd50742892e3f5bb49cb4a3a9&query=37.8267,-122.4233&units=m";
request(url, { json: true }, (error, response) => {
	// option json:true parses the response
	// const data = JSON.parse(response.body);
	if (error) {
		console.log("Unable to connect to weather service.");
	} else if (response.body.error) {
		console.log("Unable to find location.");
	} else {
		const { temperature, feelslike, weather_descriptions: desc } = response.body.current;
		const message = `${desc}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`;
		console.log(message);
	}
});

const place = "london";
const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1Ijoic2Fta285NDUiLCJhIjoiY2t5NDlqeGtsMDlzazMxbWtqaWxlNnByMiJ9.rtdtJYE5JFYdOfn0vSLglg&limit=1`;

request(geoUrl, { json: true }, (error, response) => {
	if (error) {
		console.log("Unable to connect to the location service.");
	} else if (!response.body.features.length) {
		console.log("Unable to find location.");
	} else {
		const [lon, lat] = response.body.features[0].geometry.coordinates;
		console.log(place, lat, lon);
	}
});
