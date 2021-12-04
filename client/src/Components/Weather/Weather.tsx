import './Weather.css';
import { useState, useEffect } from 'react';
import { WeatherType, WeatherData, WeatherConditions, Geolocation } from '../../Types/Weather.type';
import WeatherDay from './WeatherDay';

const getCurrentLocation = () => new Promise<Geolocation> ((resolve, reject) => {
  if (!navigator.geolocation) {
    reject('Geolocation is not supported!');
  } else {
    console.log('Loading current location...');

    navigator.geolocation.getCurrentPosition(location => {
      resolve({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    },
    (err) => console.log('Error: ', err));
  }
});

function Weather () {

  const APIWeatherKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [weatherData, setWeatherData] = useState<WeatherType>();

  useEffect(() => {
    function getCurrentWeather (geolocation: Geolocation) {
      const { latitude, longitude } = geolocation;
      const WEATHER_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&units=metric&appid=${APIWeatherKey}`
  
      fetch(WEATHER_URL)
        .then(res => res.json())
        .then(res => {
          setWeatherData(res.daily.map((day: WeatherType) => {
          console.log('RESPONSE: ', res.daily)
          return {
            dt: day.dt,
            clouds: day.clouds,
            humidity: day.humidity,
            wind_speed: day.wind_speed,
            // min: day.main.min,
            // max: day.main.max,
            // icon: day.weather[0].icon,
            // main: day.weather[0].main,
          }
        }))})
        .catch(error => console.log(error));
  }

  getCurrentLocation()
  .then(geolocation => getCurrentWeather(geolocation))
  .catch(error => console.log(error));			
}, []);

useEffect(() => {
  console.log('DATATATATA: ', weatherData)
}, [])

  return (
    <div>
      {weatherData && <WeatherDay weather={weatherData}/>}
      {/* {weatherData &&
      weatherData.map((info, index) => (
      <div key={index}>
      <WeatherDay 
      dt={info.dt}
      clouds={info.clouds} 
      humidity={info.humidity}
      wind_speed={info.wind_speed}
      temp={info.temp}
      weather={info.weather}
      />
      </div>))} */}
    </div>
  )
}

export default Weather;
