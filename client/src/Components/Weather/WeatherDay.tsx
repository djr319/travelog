import { WeatherType } from "../../Types/Weather.type";
import moment from 'moment';

interface WeatherDayProps {
  weather: WeatherType;
}

function WeatherDay ({ weather }: WeatherDayProps) {

  return (
    <div className="weather-info">
      <h3 className="weather-date">{moment.unix(weather.dt).format('LL')}</h3>
      <div className="weather-items">
        {weather.weather.map(condition =>
        <div className="weather-main" key={condition.id}>
            <img className="weather-icon" src={`http://openweathermap.org/img/wn/${condition.icon}@2x.png`} alt="Weather icon" />
          <div className="weather-description">
            {condition.main}
          </div>
        </div>)}
        <div className="weather-data">
          <p>Temperature:</p>
          <p>{'Min: ' + Math.floor(weather.temp.min)} / {'Max: ' + Math.floor(weather.temp.max)}</p>
          <p>Clouds: {weather.clouds + '%'}</p>
          <p>Humidity: {weather.humidity + '%'}</p>
          <p>Wind speed: {Math.floor(weather.wind_speed)}</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherDay;
