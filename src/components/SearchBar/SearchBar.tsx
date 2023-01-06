import React, { ChangeEvent, FormEvent, useState } from 'react';
import { getWeatherByCityName } from '../../api/fetchUrls';
import { IWeatherData } from '../../shared/interfaces';
import SvgIcon from '../SvgIcon';

type Props = {
  setWeatherData: React.Dispatch<React.SetStateAction<IWeatherData | null>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
};
type TChangeInputElement = ChangeEvent<HTMLInputElement>;
type TFormElement = FormEvent<HTMLFormElement>;

function SearchBar({ setWeatherData, setErrorMsg }: Props) {
  const [searchVal, setSearchVal] = useState('');

  const onChangeHandler = (event: TChangeInputElement) => {
    setSearchVal(event.target.value);
  };

  const onSubmitHandler = async (event: TFormElement) => {
    event.preventDefault();
    const cityName = searchVal;
    const response = await getWeatherByCityName(cityName);
    if (response.cod === 200) {
      setWeatherData(response);
    } else {
      setErrorMsg(response.message);
    }

    setSearchVal('');
  };

  return (
    <div className="border-2 border-gray-300 rounded-full">
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
