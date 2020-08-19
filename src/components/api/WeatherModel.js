class Weather{
    constructor(data){
        this.temperature = data.temp;
        this.max_temperature = data.maxCelsius;
        this.min_temperature = data.minCelsius;
        this.description = data.weatherDesc;
        this.wind_speed = data.windSpeed;
        this.humidity = data.humidity;
        this.img = data.icon;
        this.time = data.time;
        this.location = data.name;
        this.windDirection = data.windDirection;
    }
}

export default Weather;