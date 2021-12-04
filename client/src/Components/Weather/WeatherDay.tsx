import { WeatherType } from "../../Types/Weather.type";

interface WeatherDayProps {
  weather: WeatherType;
}

function WeatherDay ({ weather }: WeatherDayProps) {

  return (
    <div className="weather-info">
      {/* {weather.weather.map(condition => <div key={condition.id}>{condition.icon} {condition.main}</div>)} */}
      {/* <div>Temperature: {weather.main.min} / {weather.main.max}</div> */}
      <div>Clouds: {weather.clouds}</div>
      <div>Wind speed: {weather.wind_speed}</div>
      <div>Humidity: {weather.humidity}</div>
      <div>{weather.dt}</div>
    </div>
  )
}

export default WeatherDay;
