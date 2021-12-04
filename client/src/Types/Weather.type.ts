export type Geolocation = {
  latitude: number,
  longitude: number
}

export type WeatherType = {
  dt: number,
  clouds: number,
  humidity: number,
  wind_speed: number,
  main: {
    min: number,
    max: number
  },
  weather: [{
    id: number,
    main: string,
    icon: string}]
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
