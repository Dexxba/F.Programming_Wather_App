import { addCityToStorage, getStoredCities, removeCityFromStorage } from './Storage.js';
import { createCityCard } from './cityCard.js';


const fetchWeatherData = async (cityName) => {
  const apiKey = 'ec52f527386dff249c1e91e722fa0eea'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === "404") {
      throw new Error('City not found');
    } else {
      return {
        name: data.name,
        currentTemp: data.main.temp,
        maxTemp: data.main.temp_max,
        minTemp: data.main.temp_min
      };
    }
  } catch (error) {
    console.error("Fetching weather data failed: ", error);
  }
};
export const refreshWeatherData = async () => {
  const citiesContainer = document.getElementById('citiesContainer');
  citiesContainer.innerHTML = ''; 
  
  const storedCities = getStoredCities();
  
  for (const cityData of storedCities) {
    const updatedCityData = await fetchWeatherData(cityData.name); 
    const cityCard = createCityCard(updatedCityData); 
    citiesContainer.appendChild(cityCard);
  }
};

export const initializeCityManager = () => {
  const citiesContainer = document.getElementById('citiesContainer');
  const storedCities = getStoredCities();

  storedCities.forEach(cityData => {
    const cityCard = createCityCard(cityData);
    citiesContainer.appendChild(cityCard);
  });
  document.getElementById('refreshButton').addEventListener('click', refreshWeatherData);
  document.getElementById('addButton').addEventListener('click', async () => {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();
    if (cityName) {
      try {
        const cityData = await fetchWeatherData(cityName);
        addCityToStorage(cityData);
  
        const cityCard = createCityCard(cityData);
        citiesContainer.appendChild(cityCard);
      } catch (error) {
        console.error("Error adding city: ", error);
      }
      cityInput.value = ''; 
    }
  });  
};
