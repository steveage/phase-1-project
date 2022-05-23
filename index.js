const URL = "https://api.waqi.info/feed";

document.addEventListener("DOMContentLoaded", pageLoaded);

function pageLoaded() {
    document.getElementById("cityInput").addEventListener("submit", requestAqiDataForCity);
}

function requestAqiDataForCity(event) {
    event.preventDefault();
    requestCityData();
}

async function requestCityData() {
    const response = await fetch(getRequestUrl());
    if (response.ok) {
        const aqiData = await response.json();
    }
    else {
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
}

function getRequestUrl() {
    const city = document.getElementById("city").nodeValue;
    const token = document.getElementById("token").nodeValue;
    return `${URL}/${city}/?${token}`;
}