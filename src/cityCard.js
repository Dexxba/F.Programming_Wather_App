import { removeCityFromStorage } from './Storage.js';
const cityIcon = document.createElement('i');
cityIcon.className = 'fa-solid fa-building';
export const createCityCard = (cityData) => {
  const cityCard = document.createElement('div');
  cityCard.className = 'city-card';

  const cityHeader = document.createElement('div');
  cityHeader.className = 'city-header';

  const cityNameSpan = document.createElement('span');
  cityNameSpan.className = 'city-name';
  cityNameSpan.innerHTML = cityData.name + '&nbsp<i class="fa-solid fa-building"></i> ' ;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => {
      removeCityFromStorage(cityData.name);
      cityCard.remove();
  };

  const cityInfo = document.createElement('div');
  cityInfo.className = 'city-info';

  const currentTemp = document.createElement('p');
  currentTemp.textContent = `Current temperature: ${cityData.currentTemp}°С`;

  const maxTemp = document.createElement('p');
  maxTemp.textContent = `Maximum temperature today: ${cityData.maxTemp} °С`;

  const minTemp = document.createElement('p');
  minTemp.textContent = `Minimum temperature today: ${cityData.minTemp} °С`;

  cityHeader.appendChild(cityNameSpan);
  cityHeader.appendChild(deleteButton);

  cityInfo.appendChild(currentTemp);
  cityInfo.appendChild(maxTemp);
  cityInfo.appendChild(minTemp);

  cityCard.appendChild(cityHeader);
  cityCard.appendChild(cityInfo);

  return cityCard;
};
