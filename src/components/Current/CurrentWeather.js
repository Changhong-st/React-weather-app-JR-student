import React from 'react'
import './current.css'

export default function DisplayWeather(props){
    const {location, temperature, description, max_temperature, min_temperature, wind_speed, windDirection, humidity, img} = props.weatherData;
    const weatherInfo = [
        {key: 'Weather Description', value: description},
        {key: 'Wind Speed', value: wind_speed},
        {key: 'Wind Direction', value: windDirection},
        {key: 'Humidity', value: humidity},
    ];
    const iconAddress = `https://openweathermap.org/img/wn/${img}@2x.png`;
    return (
        <div className="user-weather">
            <div className="row">
                <div className="col-md-3 weather-temp">
                    <h1>{temperature}<sup>o</sup>C</h1>
                    <img className="currentImg" src={iconAddress} alt="weather-icon" />
                </div>

                <div className="col-md-3 location">
                    <h1>{location}</h1>
                    <div className="max-min">
                    <p>Max: {max_temperature}<sup>o</sup>C</p>
                    <p>Min: {min_temperature}<sup>o</sup>C</p>
                    </div>
                </div>
            </div>
            <div className="row weather-info">
            {weatherInfo.map((i, index) => {
                return <div key={index} className="col-md-3 weather-info">
                    <h3>{i.key}</h3>
                    <p>{i.value}</p>
                </div>
            })}
            </div>            
        </div>
    )
}