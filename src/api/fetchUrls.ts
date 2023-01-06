import { Units } from '../shared/enums';
import { DAILY_FORECAST_URL, WEATHER_URL } from './config';

const fetchData = (url: string) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

export const getWeatherByLatLong = (
  latitude: number,
  longitude: number,
  unit: string = Units.METRIC
) => {
  const url = `${WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unit}&appid=${
    import.meta.env.VITE_WEATHER_API_KEY
  }`;
  const result = fetchData(url);

  return result;
};

export const getWeatherByCityName = (
  name: string,
  unit: string = Units.METRIC
) => {
  const url = `${WEATHER_URL}q=${name}&units=${unit}&appid=${
    import.meta.env.VITE_WEATHER_API_KEY
  }`;
  const result = fetchData(url);

  return result;
};

export const getForecast = (
  latitude: number,
  longitude: number,
  unit: string = Units.METRIC
) => {
  const url = `${DAILY_FORECAST_URL}lat=${latitude}&lon=${longitude}&units=${unit}&appid=${
    import.meta.env.VITE_WEATHER_API_KEY
  }`;
  const result = fetchData(url);

  return result;
};
