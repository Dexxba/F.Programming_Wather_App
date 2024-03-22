export const getStoredCities = () => {
    return JSON.parse(localStorage.getItem('cities')) || [];
  };
  
  export const addCityToStorage = (cityData) => {
    const cities = getStoredCities(); 
    if (cities.some(city => city.name.toLowerCase() === cityData.name.toLowerCase())) {
      alert('City already exists!');
      throw new Error('City already exists in storage.');
    } else {
      cities.push(cityData);
      localStorage.setItem('cities', JSON.stringify(cities));
    }
  };
  
   export const removeCityFromStorage = (cityName) => {
    const cities = getStoredCities();
    const filteredCities = cities.filter(city => city.name !== cityName);
    localStorage.setItem('cities', JSON.stringify(filteredCities));
  };
  