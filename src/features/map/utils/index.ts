import { getStopSearches, getCrimes } from "../../../endpoints";
import axios, { AxiosError } from "axios";
import { Arrests, Searches } from "../../../interfaces";

/**
 *
 * @param data 2D array, must specify type <T>
 * @param limit int, how many entrys you want in each child array
 * @returns 2D array
 */
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

type HandleError = (error: number) => { key: string; message: string };
/**
 *
 * @param error takes in number
 * @returns Array [{key: 'error', data: 'error message', status: number}]
 */
const handleError: HandleError = (error: number) =>
  error === 0
    ? { key: "error", message: "api down" }
    : { key: "error", message: `unknown status ${error}` };

type GetData = (
  lat: number,
  lng: number,
  date: { year: number; month: number }
) => Promise<
  | [{ key: "arrests" | "searches"; data: any[] }]
  | { key: "error"; message: string }
>;

export const getData: GetData = async (
  lat: number,
  lng: number,
  date: { year: number; month: number }
) => {
  const _date =
    Object.keys(date!).length > 0 ? `${date?.year}-${date?.month}` : undefined;

  const requests = [
    getStopSearches(lat, lng, _date),
    getCrimes(lat, lng, _date),
  ].map((url) => axios.get(url));

  try {
    const res = await axios.all(requests);
    const retval = res.map((res) => {
      if (res.status !== 200) return handleError(0); //[{key, message}]

      const { url } = res.config;

      if (!url) return handleError(1); //[{key, message}]

      /**
       * ! This breaks retval
       */
      // return {
      //   key: url?.includes("crimes") ? "arrests" : "searches",
      //   data: [res.data],
      // }; //[key, data: [[]]]
    });

    // return retval;
    return [{ key: "arrests", data: [] }];
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.status === 404 || error.status === 502
        ? { key: "error", message: "not found" }
        : { key: "error", message: `new error ${error}` };
    }
    return { key: "error", message: "unknown error" };
  }
};

/**
 * @param obj optional boolean to return as object
 * @returns string: 'YYYY-MM' || {year: number, month: number}
 */
export const getCurrentMonth = (obj: boolean) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (!obj) return `${year}-${month}`;
  return { year, month };
};

type GetPoliceData = (
  lat: number,
  lng: number,
  year?: number,
  month?: number
) => Promise<
  [{ key: string; data: any[][] }] | { key: "error"; message: string }
>;

export const getPoliceData: GetPoliceData = async (lat, lng, year, month) => {
  if (!year || !month) {
    const date = getCurrentMonth(true) as { year: number; month: number };
    year = date.year;
    month = date.month - 2;
  }

  const data = await getData(lat, lng, { year, month });

  if (typeof data === "string") return { key: "error", message: data };

  // const retval = data
  //   ? data.map((payload) =>  { key: payload.key, data: [[data]] })
  //   : [{ key: "error", message: "returned data was invalid" }];

  if ("message" in retval[0])
    return { key: retval[0].key, message: retval[0].message };

  return retval;
};
