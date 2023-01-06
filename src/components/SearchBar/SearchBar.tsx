import React, { ChangeEvent, FormEvent, useState } from 'react';
import { getForecast, getWeatherByCityName } from '../../api/fetchUrls';
import { IForecastData, IWeatherData } from '../../shared/interfaces';
import SvgIcon from '../SvgIcon';

type Props = {
  setWeatherData: React.Dispatch<React.SetStateAction<IWeatherData | null>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
  setForecastData: React.Dispatch<React.SetStateAction<IForecastData | null>>;
};
type TChangeInputElement = ChangeEvent<HTMLInputElement>;
type TFormElement = FormEvent<HTMLFormElement>;

function SearchBar({ setWeatherData, setErrorMsg, setForecastData }: Props) {
  const [searchVal, setSearchVal] = useState('');

  const onChangeHandler = (event: TChangeInputElement) => {
    setSearchVal(event.target.value);
  };

  const onSubmitHandler = async (event: TFormElement) => {
    event.preventDefault();
    const cityName = searchVal;
    const cityWeatherResponse = await getWeatherByCityName(cityName);
    if (cityWeatherResponse.cod === 200) {
      setWeatherData(cityWeatherResponse);
      const forcastResponse = await getForecast(
        cityWeatherResponse.coord.lat,
        cityWeatherResponse.coord.lon
      );
      setForecastData(forcastResponse);
    } else {
      setErrorMsg(cityWeatherResponse.message);
    }

    setSearchVal('');
  };

  return (
    <div className="border-2 border-gray-300 rounded-full md:w-1/3 md:m-auto">
      <form className="flex" onSubmit={onSubmitHandler}>
        <SvgIcon
          wrapperStyle="flex justify-center items-center ml-2"
          iconName="cloud_search"
          svgProp={{
            height: '20px',
            width: '20px',
          }}
        />
        <input
          className="rounded-full py-1 px-2 w-full outline-none"
          type="text"
          value={searchVal}
          onChange={onChangeHandler}
          placeholder="Enter city name eg: Mumbai"
        />
      </form>
    </div>
  );
}

export default SearchBar;
