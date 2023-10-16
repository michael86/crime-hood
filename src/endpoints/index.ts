export const getStopSearches = (lat: number, lng: number): string => {
  return `https://data.police.uk/api/stops-street?lat=${lat}&lng=${lng}`;
};

export const getCrimes = (lat: number, lng: number): string => {
  return `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}`;
};
