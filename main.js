"use strict";

const map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const marker = L.marker([51.5, -0.09])
	.addTo(map)
	.bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
	.openPopup();
console.log(marker);
