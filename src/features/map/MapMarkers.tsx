import "./map.css";

import { useEffect, useState } from "react";
import { TileLayer } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setArrests, setSearches } from "../slices/crimeSlice";
import Marker from "./Marker";
import { Arrests, Searches } from "../../interfaces";
import {
  create2dArray,
  getCurrentMonth,
  getData,
  getPoliceData,
} from "./utils";
import Error from "./Error";

const MapMarkers: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const { searches, arrests } = useAppSelector((state) => state.crimes);
  const location = useAppSelector((state) => state.locations.geoCoords);
  const [lat, lng] = [...location[0]];

  const [apiCalled, setApiCalled] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const data = await getPoliceData(
        lat,
        lng,
        user.date?.year,
        user.date?.month
      );

      let _error = false;
      data.forEach((obj) => (_error = obj.key === "error" ? true : false));
      if (_error) {
        setError(_error);
        return;
      }

      data.forEach((obj) =>
        obj.key === "arrests"
          ? dispatch(setArrests(obj.data as Arrests[][]))
          : dispatch(setSearches(obj.data as Searches[][]))
      );
      console.log(data);
    })();
  }, [
    location,
    dispatch,
    lat,
    lng,
    user.date?.year,
    user.date?.year,
    user.limit,
  ]);

  useEffect(() => {
    if (!apiCalled) return;
    const getArrays = async () => {
      dispatch(setArrests(create2dArray<Arrests>(arrests, user.limit!)));
      dispatch(setSearches(create2dArray<Searches>(searches, user.limit!)));
    };
    getArrays();
  }, [user.limit, apiCalled]);

  //if index of page doesn't exists on either array due to array length of sibling beingout of bounds, then need to set to last of index
  const searchPage = searches[user.page!] ? user.page! : searches.length - 1;
  const arrestsPage = arrests[user.page!] ? user.page! : arrests.length - 1;

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!error &&
        user.searches &&
        searches[searchPage!].map((payload, i) => (
          <Marker payload={{ searches: payload, key: "search" }} key={i} />
        ))}
      {!error &&
        user.crimes &&
        arrests[arrestsPage!].map((payload, i) => (
          <Marker payload={{ arrests: payload, key: "arrest" }} key={i} />
        ))}

      {error && <Error />}
    </>
  );
};

export default MapMarkers;
