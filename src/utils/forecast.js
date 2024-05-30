const request = require("postman-request");

const forecast = (lat, lon, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=9458e43dd50742892e3f5bb49cb4a3a9&query=
  ${encodeURIComponent(lat)}},
  ${encodeURIComponent(lon)}&units=m`;

	request(url, { json: true }, (error, response) => {
		// option json:true parses the response
		// const data = JSON.parse(response.body);
		if (error) {
			callback("Unable to connect to weather service.", undefined);
		} else if (response.body.error) {
			callback("Unable to find location.", undefined);
		} else {
			const { temperature, feelslike, weather_descriptions: desc } = response.body.current;
			callback(undefined, { temperature, feelslike, desc });
		}
	});
};

module.exports = forecast;
