"use strict";

const mainDiv = document.querySelector(".main");
const mapDiv = document.querySelector(".map");

const mainDivHeight = mainDiv.offsetHeight;
console.log(mainDivHeight, mainDiv.clientHeight);
document.documentElement.style.setProperty(
	"--main-height",
	`${mainDivHeight}px`
);

// LEAFLET
const map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const marker = L.marker([51.5, -0.09]).addTo(map);
console.log(marker);
