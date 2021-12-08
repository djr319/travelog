import './Weather.css';
import { useState, useEffect } from 'react';
import { WeatherType, Geolocation } from '../../Types/Weather.type';
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

function Weather (): JSX.Element {

  const APIWeatherKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [weatherData, setWeatherData] = useState<WeatherType[]>([]);

  useEffect(() => {
    function getCurrentWeather (geolocation: Geolocation) {
      const { latitude, longitude } = geolocation;
      const WEATHER_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&units=metric&appid=${APIWeatherKey}`

      fetch(WEATHER_URL)
        .then(res => res.json())
        .then(res => {
          setWeatherData(res.daily)
        })
        .catch(error => console.log(error));
    }

    getCurrentLocation()
    .then(geolocation => getCurrentWeather(geolocation))
    .catch(error => console.log(error));
  }, []);

  return (
    <div className="weather">
      <h2>Current Local Weather</h2>
      <div className="weather-grid">
      {weatherData && weatherData.map((day, index) =>
        <WeatherDay weather={day} key={index} />)}
        </div>
    </div>
  )
}

export default Weather;
