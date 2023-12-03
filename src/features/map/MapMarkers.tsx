import "./map.css";

import axios from "axios";

import { useEffect, useState } from "react";
import { TileLayer } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setArrests, setSearches } from "../slices/crimeSlice";
import { getCrimes, getStopSearches } from "../../endpoints";
import Marker from "./Marker";
import { Arrests, Searches } from "../../interfaces";
import { create2dArray, getData } from "./utils";

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
    date,
  } = useAppSelector((state) => state.user);

  useEffect(() => {
    const year = date?.year || 2023;
    const month = date?.month || 6;
    const data = getData(lat, lng, limit!, { year, month });
  }, [location, dispatch, lat, lng]);

  useEffect(() => {
    if (!apiCalled) return;
    const getArrays = async () => {
      dispatch(setArrests(create2dArray<Arrests>(arrests, limit!)));
      dispatch(setSearches(create2dArray<Searches>(searches, limit!)));
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
