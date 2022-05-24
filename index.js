const URL = "https://api.waqi.info/feed";
const allCitiesAqi = [];

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
        const aqiCityData = await response.json();
        displayAqiDataIfOk(aqiCityData);
    }
    else {
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
}

function getRequestUrl() {
    const city = document.getElementById("city").value;
    const token = document.getElementById("token").value;
    const requestUrl = `${URL}/${city}/?token=${token}`;
    return requestUrl;
}

function displayAqiDataIfOk(aqiCityData) {
    if (aqiCityData.status === "ok") {
        displayAqiData(aqiCityData);
    }
}

function displayAqiData(aqiCityData) {
    addCityToCollection(aqiCityData);
    displayCities();
}

function addCityToCollection(aqiCityData) {
    allCitiesAqi.push(aqiCityData);
}

function displayCities() {
    let gridUI = document.getElementById("cities-grid");
    gridUI.replaceChildren();
    allCitiesAqi.forEach(cityAqi => displayCityAqi(cityAqi, gridUI));
}

function displayCityAqi(cityAqi, gridUI) {
    gridUI.appendChild(createCityAqiDivUI(cityAqi));
}

function createCityAqiDivUI(cityAqi) {
    const divUI = getCityDivUI(cityAqi);
    const cityNameUI = createUiElement('header', cityAqi.data.city.name);
    const aqiUI = createUiElement('p', cityAqi.data.aqi);
    const button = createUiElement('button', "X");
    button.addEventListener("click", handleButtonClick);
    divUI.appendChild(cityNameUI);
    divUI.appendChild(aqiUI);
    divUI.appendChild(button);
    return divUI;
}

function getCityDivUI(cityAqi) {
    const divUI = document.createElement('div');
    divUI.classList.add("cities-grid-item");
    return divUI;
}

function createUiElement(elementName, text) {
    const element = document.createElement(elementName);
    const node = document.createTextNode(text);
    element.appendChild(node);
    return element;
}

function handleButtonClick(event) {
    event.preventDefault();
    const cityName = event.target.parentElement.childNodes[0].textContent;
    const city = allCitiesAqi.find(city => city.data.city.name === cityName);
    allCitiesAqi.splice(allCitiesAqi.indexOf(city), 1);
    displayCities();
}