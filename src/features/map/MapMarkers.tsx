import "./map.css";

import axios from "axios";

import { useEffect } from "react";
import { TileLayer } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setArrests, setSearches } from "../slices/crimeSlice";
import { getCrimes, getStopSearches } from "../../endpoints";
import Marker from "./Marker";

const MapMarkers: React.FC = () => {
  const dispatch = useAppDispatch();

  const { searches, arrests } = useAppSelector((state) => state.crimes);
  const location = useAppSelector((state) => state.locations);
  const [lat, lng] = [...location[0]];

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
        const { data } = res;
        const { url } = res.config;

        if (res.status !== 200) {
          handleError();
          return;
        }

        url?.includes("crimes")
          ? dispatch(setArrests(res.data))
          : dispatch(setSearches(res.data));
      });
    });
  }, [location]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {searches.map((payload, i) => (
        <Marker payload={{ searches: payload }} key={i} />
      ))}
      {arrests.map((payload, i) => (
        <Marker payload={{ arrests: payload }} key={i} />
      ))}
    </>
  );
};

export default MapMarkers;
