const request = require("postman-request");
const yargs = require("yargs");

// use encodeURIComponent() to be able to use escape characters that would otherwise mean something to the browser,  for example, "?" is reserved to mark the start of a query string, if we do not encode this then it can break the syntax

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1Ijoic2Fta285NDUiLCJhIjoiY2t5NDlqeGtsMDlzazMxbWtqaWxlNnByMiJ9.rtdtJYE5JFYdOfn0vSLglg&limit=1`;

	request(url, { json: true }, (error, response) => {
		if (error) {
			callback("Unable to connect to the location service.", undefined);
		} else if (!response.body.features.length) {
			callback("Unable to find location.", undefined);
		} else {
			const [lon, lat] = response.body.features[0].center;
			const { place_name: location } = response.body.features[0];
			callback(undefined, { location, lat, lon });
		}
	});
};

module.exports = geocode;
