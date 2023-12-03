import { getStopSearches, getCrimes } from "../../../endpoints";
import axios from "axios";
import { Searches, Arrests } from "../../../interfaces";

export const create2dArray = <T>(data: T[][], limit: number): T[][] => {
  const copy: T[] = [];

  for (const index in data) {
    for (const entry of data[index]) {
      copy.push(entry);
    }
  }

  if (!copy.length) return [[]];

  const pages: T[][] = [];

  let counter = 0;
  let pageIndex = 0;

  for (let i = 0; i < copy.length; i++) {
    pages[pageIndex] = pages[pageIndex] || [];
    pages[pageIndex].push(copy[i]);
    counter++;

    if (limit !== 0 && counter >= limit!) {
      pageIndex++;
      counter = 0;
    }
  }

  return pages;
};

/**
 *
 * @param error takes in number
 * @returns Array [{key: 'error', data: 'error message', status: number}]
 */
const handleError = (error: number) =>
  error === 0
    ? [{ key: "error", data: "api down" }]
    : [{ key: "error", data: `unknown status ${error}` }];

export const getData = async <T>(
  lat: number,
  lng: number,
  date: { year: number; month: number }
) => {
  const _date = Object.keys(date!).length > 0 ? `${date?.year}-${date?.month}` : undefined;

  const requests = [getStopSearches(lat, lng, _date), getCrimes(lat, lng, _date)].map((url) =>
    axios.get(url)
  );

  const res = await axios.all(requests);

  const retval = res.map((res) => {
    if (res.status !== 200) return handleError(0);

    const { url } = res.config;

    if (!url) return handleError(1);

    return {
      key: url?.includes("crimes") ? "arrests" : "searches",
      data: [res.data],
    };
  });

  return retval;
};
