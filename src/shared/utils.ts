/**
 * Convert unix timestamp to date
 * @param unixTimestamp unix timestamp
 * @returns calculated date object
 */
export const unixTimestampToDate = (unixTimestamp: number): Date => {
  return new Date(unixTimestamp * 1000);
};

/**
 * Converts wind degree to compass direction
 * @param windDegree
 * @returns direction in string
 */
export const degreeTodirection = (windDegree: number): string => {
  const compassPoints = [
    { key: 'N', value: 'North' },
    { key: 'NNE', value: 'North North East' },
    { key: 'NE', value: 'North East' },
    { key: 'ENE', value: 'East North East' },
    { key: 'E', value: 'East' },
    { key: 'ESE', value: 'East South East' },
    { key: 'SE', value: 'South East' },
    { key: 'SSE', value: 'South South East' },
    { key: 'S', value: 'South' },
    { key: 'SSW', value: 'South South West' },
    { key: 'SW', value: 'South West' },
    { key: 'WSW', value: 'West South West' },
    { key: 'W', value: 'West' },
    { key: 'WNW', value: 'West North West' },
    { key: 'NW', value: 'North West' },
    { key: 'NNW', value: 'North North West' },
  ];
  const rawPosition = Math.floor(windDegree / 22.5 + 0.5);
  const arrayPosition = rawPosition % 16;

  return compassPoints[arrayPosition].key;
};

/**
 * convert meter/second to kilometer/hour
 * @param mps meter/second
 * @returns kilometer/hour
 */
export const mpsTokmph = (mps: number): number => {
  return Math.round(mps * 3.6);
};

/**
 * Convert decimal temperature value to rounded temperature value with degree symbol
 * @param temperature Temperature in Degree celcius
 * @returns formatted and rounded value
 */
export const roundedTemperature = (temperature: number): string => {
  return `${Math.round(temperature)}°`;
};

/**
 * Get 12Hr formatted time from Date object
 * @param dateObj Date object
 * @returns 12Hr formated time eg: 7:00 pm
 */
export const get12HTimefromDate = (dateObj: Date): string => {
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours % 12 ? hours % 12 : 12;

  return `${hours}:${minutesStr} ${ampm}`;
};

/**
 * Obtain the correct time, from the specific city that the data is being fetched from.
 * Open Weather displays the timezone in seconds.
 * @param unixTimestamp unix timestamp
 * @param timezoneOffset offset based on location/zone (Shift in seconds from UTC)
 * @returns
 */
export const getTimefromTimeZone = (
  unixTimestamp: number,
  timezoneOffset: number
): Date => {
  const date = unixTimestampToDate(unixTimestamp);
  const localTime = date.getTime();
  const localOffset = date.getTimezoneOffset() * 6000 * 10; // Find local time offset (had to multiply by 10 for native)
  const utc = localTime + localOffset; // Obtain current UTC time
  const cityTime = utc + 1000 * timezoneOffset; // Obtain destination city's offset in hours and convert to milliseconds

  return new Date(cityTime);
};

/**
 * Get formatted date string from date object
 * @param dateObj Date Object
 * @returns formatted date string eg: May 30
 */
export const getFormattedDate = (dateObj: Date): string => {
  const [day, month, date, year] = dateObj.toDateString().split(' ');
  return `${day}, ${month} ${date} ${year}`;
};
