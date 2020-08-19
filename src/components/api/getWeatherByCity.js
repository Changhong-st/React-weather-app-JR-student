import axios from 'axios';
import Weather from './WeatherModel';
//import CityWeather from './CityWeather';

function getWeatherByCity(cc, city){
    return Promise.all(getCurrentAndForecastWeatherData(cc, city)).then((resArray) => {
        const currentData = resArray[0].data;
        const forecastData = resArray[1].data;
        //console.log(currentData);
        //console.log(forecastData);
        const cityName = currentData.city.name;
        // const countryName = currentData.city.country;
        const weatherData = new Weather(currentData.current);
        weatherData.location = cityName;
        console.log(weatherData);
        const weatherData_forecast = forecastData.forecast.map(i => new Weather(i));
        const data = {weatherData, weatherData_forecast}
        return data;
    }).catch(err => {
        console.log(err.message);
    });
}

function getCurrentAndForecastWeatherData(cc, city) {
    return [
        axios.get(`https://ch-weather.herokuapp.com/v1/weather/${cc}/${city}/current`),
        axios.get(`https://ch-weather.herokuapp.com/v1/weather/${cc}/${city}/forecast`),
    ]
}

export default getWeatherByCity;