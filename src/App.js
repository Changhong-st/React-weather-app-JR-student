import React from 'react';
import './App.css';
import axios from 'axios';
import CurrentWeather from './components/Current/CurrentWeather';
import NavBar from './components/Navbar/NavBar';
import ForecastWeather from './components/Forecast/ForecastWeather';
import getWeatherByCity from './components/api/getWeatherByCity';
import Weather from './components/api/WeatherModel'; 
import 'font-awesome/css/font-awesome.min.css';


class App extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  state = {
    coords: {
      latitude: -27.470030,
      longitude: 153.022980,
    },
    weather_data: {},
    city:"",
    country:"",
    forecastArray: [],
    loading: true,

  }

  componentDidMount(){
    //get device location
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        this.setState({
          coords: newCoords,
          loading: true,
        });
         axios.get(`https://ch-weather.herokuapp.com/v1/weather/location/${this.state.coords.latitude}/${this.state.coords.longitude}`).then(res => { // location
           const weatherData = new Weather(res.data.position);
          this.setState({weather_data: weatherData});
        }).then(res => { //要进行函数封装 //cc, city root .env
          axios.get(`https://ch-weather.herokuapp.com/v1/weather/${this.state.weather_data.country}/${this.state.weather_data.location}/forecast`).then(res => {
            const forecastDataLocation = res.data;
            const weatherDataForecast = forecastDataLocation.forecast.map(i => new Weather(i)); //getWeatherByCity
            this.setState({
              forecastArray: weatherDataForecast,
              loading: false,
            }); 
          })
        })
      })
    }else {
      console.log("sorry, your device don't support geolocation.");
    }
  }

  handleCountry = (value) => {
    this.setState({country: value})
  }
  
  handleCity = (value) => {
    this.setState({city: value})
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newData =await getWeatherByCity(this.state.country, this.state.city);
    if (newData === undefined){
      this.setState({
        loading: false,
      });
      return alert('Country or City not found, please make sure enter correct info');
    }
    const weatherData_forecast = newData.weatherData_forecast;
    const weatherData = newData.weatherData;  
    this.setState({
      weather_data: weatherData,
      forecastArray: weatherData_forecast,
      loading: false,
    });
  }
  
  render(){
    const {loading, forecastArray, weather_data} = this.state;
    return (
      <div className="App">
      {loading?
        <div className="container"><i class="loading fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        <span class="sr-only">Loading...</span></div>:
        <div className="container">
          <NavBar handleSubmit = {this.handleSubmit} handleCountry = {this.handleCountry} handleCity = {this.handleCity} />
          <CurrentWeather weatherData = {weather_data}/> 
          <div className="forecast-container"><div className="forecast-header">Future Five Days</div>
          {forecastArray.map((i, index) => {return <ForecastWeather key={index} forecastData = {i} />})}
          </div>
        </div>
      }
      </div>
    );
  }
}

export default App;
