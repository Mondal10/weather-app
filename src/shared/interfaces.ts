export interface IDailyWeatherData {
  icon: string;
  description: string;
  main: string;
}

export interface ICoOrdinates {
  lon: number;
  lat: number;
}

export interface IDailyData {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: IDailyWeatherData[];
}

export interface IWeatherData {
  name: string;
  dt: number;
  coord: ICoOrdinates;
  weather: IDailyWeatherData[];
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    deg: number;
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  timezone: number;
}

export interface IForecastData {
  timezone_offset: number;
  daily: IDailyData[];
}
