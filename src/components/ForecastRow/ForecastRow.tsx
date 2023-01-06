import React from 'react';
import { WEATHER_ICONS } from '../../shared/constants';
import { IDailyData } from '../../shared/interfaces';
import { getFormattedDate, getTimefromTimeZone } from '../../shared/utils';

type Props = {
  dailyData: IDailyData;
  timezone: number;
};

function ForecastRow({ dailyData, timezone }: Props) {
  const tempRange = `${Math.round(dailyData.temp.min)}°/${Math.round(
    dailyData.temp.max
  )}°`;
  const weather = dailyData.weather[0];

  return (
    <div className="grid grid-cols-3 gap-2 items-center py-2">
      <div className="col-span-1">
        {
          getFormattedDate(getTimefromTimeZone(dailyData.dt, timezone)).split(
            ','
          )[0]
        }
      </div>
      <div className="flex col-span-1 justify-center gap-2">
        <img
          width={30}
          src={WEATHER_ICONS[weather.icon as keyof typeof WEATHER_ICONS]}
        />
        <div className="capitalize">{weather.main}</div>
      </div>
      <div className="col-span-1">{tempRange}</div>
    </div>
  );
}

export default ForecastRow;
