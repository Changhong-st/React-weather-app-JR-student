import React from 'react'
import './forecast.css'

export default function ForecastWeather(props) {
    const {temperature, img, time, description} = props.forecastData;
    const iconURL = `http://openweathermap.org/img/wn/${img}@2x.png`;
    const getWeekDay = (time) =>{
        const weekDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const myDate = new Date(Date.parse(time));
        const myWeekDay = weekDay[myDate.getDay()];
        return myWeekDay;
    }

    return (
    
        
            <div className="col-md-2 forecast-info">
                <h3>{getWeekDay(time)}</h3>
                <img className="forecastImg" src={iconURL} alt="weather-img" />
                <p>{temperature}<sup>o</sup>C <br/>{description}</p> 
            </div>


    )
}
