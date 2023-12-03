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

export const getData = async <T>(
  lat: number,
  lng: number,
  limit: number,
  date: { year: number; month: number }
): Promise<{ key: string; data: [T] | undefined }> => {
  const handleError = () => {
    console.log("error");
  };

  const _date =
    Object.keys(date!).length > 0 ? `${date?.year}-${date?.month}` : undefined;

  const requests = [
    getStopSearches(lat, lng, _date),
    getCrimes(lat, lng, _date),
  ].map((url) => axios.get(url));

  const res = await axios.all(requests);

  const data = res.map((res) => {
    if (res.status !== 200) return { key: "error", data: undefined };

    const { url } = res.config;

    if (res.status !== 200) {
      handleError();
      return;
    }

    /**as we fetch the data here, we create our 2d array based on the limit.
     * however, we're unsure on the type res.data contains: Arrests|Searches
     *  so type narrow using the url when dispatching to the store
     */
    return {
      key: url?.includes("crimes") ? "crimes" : "searches",
      data: limit > 0 ? create2dArray([res.data], limit) : [res.data],
    };
  });

  return data;
};
