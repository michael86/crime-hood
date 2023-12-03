export const getStopSearches = (
  lat: number,
  lng: number,
  date: string | undefined
): string => {
  let url = `https://data.police.uk/api/stops-street?lat=${lat}&lng=${lng}`;
  url = date !== undefined ? (url += `&date=${date}`) : url;
  return url;
};

export const getCrimes = (
  lat: number,
  lng: number,
  date: string | undefined
): string => {
  let url = `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}`;
  url = date !== undefined ? (url += `&date=${date}`) : url;
  return url;
};
