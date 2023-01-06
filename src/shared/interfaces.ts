export interface IWeatherData {
  name: string;
  dt: number;
  coord: ICoOrdinates;
  weather: {
    icon: string;
    description: string;
  }[];
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

export interface ICoOrdinates {
  lon: number;
  lat: number;
}
