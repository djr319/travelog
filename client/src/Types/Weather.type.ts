export type Geolocation = {
  latitude: number,
  longitude: number
}

export type WeatherType = {
  dt: number,
  clouds: number,
  humidity: number,
  wind_speed: number,
  temp: WeatherData,
  weather: WeatherConditions[]
}

export type WeatherData = {
  min: number,
  max: number
}

export type WeatherConditions = {
  id: number,
  main: string,
  icon: string
}
