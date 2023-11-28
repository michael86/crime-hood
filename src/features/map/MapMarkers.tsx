import "./map.css";

import axios from "axios";

import { useEffect, useState } from "react";
import { TileLayer } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setArrests, setSearches } from "../slices/crimeSlice";
import { getCrimes, getStopSearches } from "../../endpoints";
import Marker from "./Marker";
import { Arrests, Searches } from "../../interfaces";
import { Type } from "typescript";

const MapMarkers: React.FC = () => {
  const dispatch = useAppDispatch();
  const [apiCalled, setApiCalled] = useState<boolean>(false);

  const { searches, arrests } = useAppSelector((state) => state.crimes);

  const location = useAppSelector((state) => state.locations.geoCoords);
  const [lat, lng] = [...location[0]];

  const {
    searches: showSearches,
    crimes: showCrimes,
    limit,
    page,
  } = useAppSelector((state) => state.user);

  const create2dArray = <T,>(data: T[][]): T[][] => {
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

  useEffect(() => {
    const handleError = () => {
      console.log("error");
    };

    const requests = [getStopSearches(lat, lng), getCrimes(lat, lng)].map(
      (url) => axios.get(url)
    );

    axios.all(requests).then((response) => {
      response.forEach((res) => {
        if (res.status !== 200) return;

        const { url } = res.config;

        if (res.status !== 200) {
          handleError();
          return;
        }

        /**as we fetch the data here, we create our 2d array based on the limit.
         * however, we're unsure on the type res.data contains: Arrests|Searches
         *  so type narrow using the url when dispatching to the store
         */
        const data = limit! > 0 ? create2dArray([res.data]) : [res.data];

        url?.includes("crimes")
          ? dispatch(setArrests(data))
          : dispatch(setSearches(data));

        setApiCalled(true);
      });
    });
  }, [location, dispatch, lat, lng]);

  useEffect(() => {
    if (!apiCalled) return;
    const getArrays = async () => {
      dispatch(setArrests(create2dArray<Arrests>(arrests)));
      dispatch(setSearches(create2dArray<Searches>(searches)));
    };
    getArrays();
  }, [limit, apiCalled]);

  //if index of page doesn't exists on either array due to array length of sibling beingout of bounds, then need to set to last of index

  const searchPage = searches[page!] ? page! : searches.length - 1;
  const arrestsPage = arrests[page!] ? page! : arrests.length - 1;

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showSearches &&
        searches[searchPage!].map((payload, i) => (
          <Marker payload={{ searches: payload, key: "search" }} key={i} />
        ))}
      {showCrimes &&
        arrests[arrestsPage!].map((payload, i) => (
          <Marker payload={{ arrests: payload, key: "arrest" }} key={i} />
        ))}
    </>
  );
};

export default MapMarkers;
