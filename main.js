"use strict";

const mainDiv = document.querySelector(".main");
const mapDiv = document.querySelector(".map");
const dataContainer = document.querySelector(".data-container");
const mainDivHeight = mainDiv.offsetHeight;
const input = document.querySelector("input");
const inputButton = document.querySelector(".input-button");
document.documentElement.style.setProperty(
	"--main-height",
	`${mainDivHeight}px`,
);
input.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		main(e);
	}
});
inputButton.addEventListener("click", (e) => {
	main(e);
});
let map;

const main = async function (e = "") {
	//GETTING THE IP
	const data = async function () {
		try {
			const res = await fetch(
				`https://geo.ipify.org/api/v2/country,city?apiKey=${
					import.meta.env.VITE_GEO_KEY
				}${e === "" ? e : `&ipAddress=${input.value}`}`,
			);
			const data = await res.json();
			input.value = "";
			if (!res.ok) {
				console.log(data.description);
				return;
			}
			return data;
		} catch (error) {
			console.error(error);
		}
	};
	//Destructuring the data
	const { ip, isp, location } = await data();
	//populating the html
	dataContainer.innerHTML = `
	<div class="data">
						<p>IP ADDRESS</p>
						<h2>${ip}</h2>
					</div>
					<div class="data">
						<p>LOCATION</p>
						<h2>${location?.city ?? ""}, ${location.country}</h2>
					</div>
					<div class="data">
						<p>TIMEZONE</p>
						<h2>UTC ${location.timezone}</h2>
					</div>
					<div class="data">
						<p>ISP</p>
						<h2>${isp}</h2>
					</div>
	`;
	console.log(location.lat, location.lng);

	// LEAFLET

	const createMap = function () {
		map = L.map("map");
		map.setView([location.lat, location.lng], 13);
		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		const marker = L.marker([location.lat, location.lng]).addTo(map);
		console.log(marker);
	};
	const updateMap = function () {
		map?.setView([location.lat, location.lng], 13);
		const marker = L.marker([location.lat, location.lng]).addTo(map);
	};
	map ? updateMap() : createMap();
};

main();
