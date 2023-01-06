import { WEATHER_ICONS } from '../../shared/constants';
import { getFormattedDate, getTimefromTimeZone } from '../../shared/utils';
import styles from './WeatherWidget.module.css';

type Props = {
  cityName: string;
  icon: string;
  temperature: number;
  description: string;
  timezone: number;
  currentDate: number;
};

function WeatherWidget(props: Props) {
  const { cityName, icon, temperature, description, timezone, currentDate } =
    props;
  return (
    <div className="flex flex-col items-center">
      <div className="relative top-14">
        <div className="bg-white text-center shadow-lg text-black rounded-md px-4 py-1">
          <div className="">{cityName}</div>
          <div>
            {getFormattedDate(getTimefromTimeZone(currentDate, timezone))}
          </div>
        </div>
        <div className="capitalize text-center text-white pt-2">
          {description}
        </div>
      </div>
      <div
        style={{ minWidth: '230px' }}
        className={`rounded-[30px] p-4 ${styles.gradientMesh}`}
      >
        <div className="text-largest text-white text-center font-light">{`${Math.round(
          temperature
        )}°`}</div>
      </div>
      <img
        width={250}
        className="relative -top-14"
        src={WEATHER_ICONS[icon as keyof typeof WEATHER_ICONS]}
      />
    </div>
  );
}

export default WeatherWidget;
