import React, { useEffect, useState } from 'react';
import { getForecast } from '../../api/fetchUrls';
import { ICoOrdinates, IForecastData } from '../../shared/interfaces';
import ForecastRow from '../ForecastRow/ForecastRow';
import ForecastLoader from '../Loaders/ForecastLoader';

type Props = {
  coord: ICoOrdinates;
  forecastData: IForecastData | null;
  setForecastData: React.Dispatch<React.SetStateAction<IForecastData | null>>;
};

function ForecastCard({ coord, forecastData, setForecastData }: Props) {
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  async function onLoad() {
    if (Object.keys(coord).length) {
      const { lat: latitude, lon: longitude } = coord;
      try {
        if (forecastData) {
          setForecastData(null);
          setErrorMsg(null);
        }

        const response = await getForecast(latitude, longitude);

        setForecastData(response);
      } catch (error) {
        setErrorMsg(error.message);
        throw new Error(error);
      }
    }
  }

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      {forecastData ? (
        <div className="md:w-1/2 md:m-auto flex flex-col rounded-md text-center shadow bg-white mt-10 py-2">
          {forecastData.daily.map((data) => (
            <ForecastRow
              key={data.dt}
              dailyData={data}
              timezone={forecastData.timezone_offset}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <ForecastLoader />
        </div>
      )}
    </>
  );
}

export default ForecastCard;
