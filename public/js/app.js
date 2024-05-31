console.log("client side javascript file is loaded.");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const location = search.value;

	messageOne.textContent = "Loading...";
	messageTwo.textContent = "";

	fetch(`/weather?place=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				console.log(data.error);
				messageOne.textContent = data.error;
				messageTwo.textContent = "";
			} else {
				const { desc, feelslike, temperature } = data.forecast;
				console.log(data.location);
				console.log(data.forecast);
				messageOne.textContent = `${data.location}`;
				messageTwo.textContent = `
        ${desc}.
        It is ${temperature}°C and feels like ${feelslike}°C.`;
			}
		});
	});
});
