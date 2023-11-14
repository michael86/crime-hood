import "./map.css";

import axios from "axios";

import { useEffect, useLayoutEffect, useRef } from "react";
import { TileLayer } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setArrests, setSearches } from "../slices/crimeSlice";
import { getCrimes, getStopSearches } from "../../endpoints";
import Marker from "./Marker";
import { Arrests, Searches } from "../../interfaces";

const MapMarkers: React.FC = () => {
  const dispatch = useAppDispatch();
  const firstRender = useRef<boolean>(true);

  const { searches, arrests } = useAppSelector((state) => state.crimes);
  const location = useAppSelector((state) => state.locations.geoCoords);
  const [lat, lng] = [...location[0]];

  const {
    searches: showSearches,
    crimes: showCrimes,
    limit,
  } = useAppSelector((state) => state.user);

  const create2dArray = (data: Arrests[][] | Searches[][]) => {
    type array = any[][];
    const copy = [...data].flat();
    const pages: array = [];

    const counter = 0;
    const pageIndex = 0;
    for (let i = 0; i <= copy.length; i++) {
      pages[pageIndex] = pages[pageIndex] || [];
      pages[pageIndex].push(copy[i]);
    }

    return [[{}]];
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

        const data = limit! > 0 ? create2dArray(res.data) : res.data;

        url?.includes("crimes")
          ? dispatch(setArrests(res.data))
          : dispatch(setSearches(res.data));
      });
    });
  }, [location, dispatch, lat, lng]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    create2dArray(arrests);
    // dispatch(setArrests(create2dArray(arrests)));
    // dispatch(setSearches(create2dArray(searches)));
  }, [limit]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showSearches &&
        searches[0].map((payload, i) => (
          <Marker payload={{ searches: payload }} key={i} />
        ))}
      {showCrimes &&
        arrests[0].map((payload, i) => (
          <Marker payload={{ arrests: payload }} key={i} />
        ))}
    </>
  );
};

export default MapMarkers;
