import { useEffect, useState } from 'react';
import { getWeatherByLatLong } from './api/fetchUrls';
import ExtraInfo from './components/ExtraInfo';
import Header from './components/Header';
import WeatherInfoLoader from './components/Loaders/WeatherInfoLoader';
import WeatherWidgetLoader from './components/Loaders/WeatherWidgetLoader';
import SearchBar from './components/SearchBar';
import WeatherWidget from './components/WeatherWidget';
import { Units } from './shared/enums';
import { useGeolocation } from './shared/hooks/useGeolocation';
import { IForecastData, IWeatherData } from './shared/interfaces';
import './App.css';
import ForecastCard from './components/ForecastCard/ForecastCard';
import ForecastLoader from './components/Loaders/ForecastLoader';

function App() {
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [forecastData, setForecastData] = useState<IForecastData | null>(null);

  const { isLoading, position, error } = useGeolocation();
  async function onLoad() {
    if (position) {
      const { latitude, longitude } = position.coords;
      try {
        if (weatherData) {
          setWeatherData(null);
          setErrorMsg(null);
        }

        const response = await getWeatherByLatLong(
          latitude,
          longitude,
          Units.METRIC
        );

        if (response.cod === 200) {
          setWeatherData(response);
        } else {
          setErrorMsg(response.message);
        }
      } catch (error) {
        setErrorMsg(error.message);
        throw new Error(error);
      }
    }
  }

  useEffect(() => {
    onLoad();
  }, [isLoading]);

  return (
    <div className="p-4 appGradient">
      <SearchBar
        setWeatherData={setWeatherData}
        setErrorMsg={setErrorMsg}
        setForecastData={setForecastData}
      />
      {weatherData ? (
        <div className="md:m-auto">
          <div className="md:flex md:justify-evenly md:items-center">
            <WeatherWidget
              cityName={weatherData.name}
              icon={weatherData.weather[0].icon}
              temperature={weatherData.main.temp}
              description={weatherData.weather[0].description}
              timezone={weatherData.timezone}
              currentDate={weatherData.dt}
            />
            <ExtraInfo
              pressure={weatherData.main.pressure}
              windSpeed={weatherData.wind.speed}
              windDegree={weatherData.wind.deg}
              sunrise={weatherData.sys.sunrise}
              sunset={weatherData.sys.sunset}
              humidity={weatherData.main.humidity}
              timezone={weatherData.timezone}
            />
          </div>
          <ForecastCard
            coord={weatherData?.coord}
            forecastData={forecastData}
            setForecastData={setForecastData}
          />
        </div>
      ) : (
        <div className="mt-10">
          <WeatherWidgetLoader />
          <br />
          <br />
          <WeatherInfoLoader />
          <br />
          <br />
          <ForecastLoader />
        </div>
      )}
    </div>
  );
}

export default App;
