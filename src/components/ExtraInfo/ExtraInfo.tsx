import { COLOURS } from '../../shared/constants';
import {
  degreeTodirection,
  get12HTimefromDate,
  getTimefromTimeZone,
  mpsTokmph,
} from '../../shared/utils';
import SvgIcon from '../SvgIcon';

type Props = {
  pressure: number;
  windSpeed: number;
  windDegree: number;
  sunrise: number;
  sunset: number;
  humidity: number;
  timezone: number;
};

function ExtraInfo(props: Props) {
  const {
    pressure,
    windSpeed,
    windDegree,
    sunrise,
    sunset,
    humidity,
    timezone,
  } = props;
  const iconSizeColor = {
    height: '20px',
    width: '20px',
    stroke: COLOURS.PURPLE,
  };
  const SvgWrapperStyle = 'flex justify-center items-center';

  return (
    <div className="flex flex-col rounded-md text-center shadow bg-white">
      {/* 1st Row */}
      <div className="flex flex-row justify-between p-2">
        <div className="m-2 items-center">
          <SvgIcon
            wrapperStyle={SvgWrapperStyle}
            iconName="speedometer"
            svgProp={iconSizeColor}
          />
          <div className="font-medium" style={{ color: COLOURS.DARKGRAY2 }}>
            {pressure} mBar
          </div>
          <div style={{ color: COLOURS.DARKGRAY1 }}>Pressure</div>
        </div>
        <div className="m-2 items-center">
          <SvgIcon
            wrapperStyle={SvgWrapperStyle}
            iconName="weather_windy"
            svgProp={iconSizeColor}
          />
          <div className="font-medium" style={{ color: COLOURS.DARKGRAY2 }}>
            {mpsTokmph(windSpeed)} km/h
          </div>
          <div style={{ color: COLOURS.DARKGRAY1 }}>Wind</div>
        </div>
        <div className="m-2 items-center">
          <SvgIcon
            wrapperStyle={SvgWrapperStyle}
            iconName="navigation"
            svgProp={{ ...iconSizeColor, fill: COLOURS.PURPLE }}
          />
          <div className="font-medium" style={{ color: COLOURS.DARKGRAY2 }}>
            {degreeTodirection(windDegree)}
          </div>
          <div style={{ color: COLOURS.DARKGRAY1 }}>Direction</div>
        </div>
      </div>
      {/* Separator */}
      <hr className="w-3/4 text-center m-auto"></hr>
      {/* 2nd Row */}
      <div className="flex flex-row justify-between p-2">
        <div className="m-2 items-center">
          <SvgIcon
            wrapperStyle={SvgWrapperStyle}
            iconName="humidity"
            svgProp={iconSizeColor}
          />
          <div className="font-medium" style={{ color: COLOURS.DARKGRAY2 }}>
            {humidity} %
          </div>
          <div style={{ color: COLOURS.DARKGRAY1 }}>Humidity</div>
        </div>
        <div className="m-2 items-center">
          <SvgIcon
            wrapperStyle={SvgWrapperStyle}
            iconName="sunrise"
            svgProp={iconSizeColor}
          />
          <div className="font-medium" style={{ color: COLOURS.DARKGRAY2 }}>
            {get12HTimefromDate(getTimefromTimeZone(sunrise, timezone))}
          </div>
          <div style={{ color: COLOURS.DARKGRAY1 }}>Sunrise</div>
        </div>
        <div className="m-2 items-center">
          <SvgIcon
            wrapperStyle={SvgWrapperStyle}
            iconName="sunset"
            svgProp={iconSizeColor}
          />
          <div className="font-medium" style={{ color: COLOURS.DARKGRAY2 }}>
            {get12HTimefromDate(getTimefromTimeZone(sunset, timezone))}
          </div>
          <div style={{ color: COLOURS.DARKGRAY1 }}>Sunset</div>
        </div>
      </div>
    </div>
  );
}

export default ExtraInfo;
