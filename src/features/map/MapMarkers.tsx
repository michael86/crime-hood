import "./map.css";

import { useEffect, useState } from "react";
import { TileLayer } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setArrests, setSearches } from "../slices/crimeSlice";
import Marker from "./Marker";
import { Arrests, Searches } from "../../interfaces";
import { create2dArray, getCurrentMonth, getData } from "./utils";
import Error from "./Error";

const MapMarkers: React.FC = () => {
  const dispatch = useAppDispatch();

  const [apiCalled, setApiCalled] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { searches, arrests } = useAppSelector((state) => state.crimes);
  const location = useAppSelector((state) => state.locations.geoCoords);
  const {
    searches: showSearches,
    crimes: showCrimes,
    limit,
    page,
    date,
  } = useAppSelector((state) => state.user);
  const [lat, lng] = [...location[0]];

  useEffect(() => {
    const _getData = async () => {
      let year = date?.year;
      let month = date?.month;

      if (!year || !month) {
        const date = getCurrentMonth(true) as { year: number; month: number };
        year = date.year;
        month = date.month;
      }

      const data = await getData(lat, lng, { year, month });

      setApiCalled(true);

      if (typeof data === "string") {
        setError(true);
        return;
      }

      setError(false);
      data &&
        data.forEach((payload) => {
          if ("key" in payload) {
            let { data } = payload;

            if (limit! > 0) {
              data =
                payload.key === "arrests"
                  ? create2dArray<Arrests>(data, limit!)
                  : create2dArray<Searches>(data, limit!);
            }

            payload.key === "arrests" && dispatch(setArrests(data));
            payload.key === "searches" && dispatch(setSearches(data));
            payload.key === "error" && setError(true);
          }
        });
    };
    _getData();
  }, [location, dispatch, lat, lng, date]);

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
      {!error &&
        showSearches &&
        searches[searchPage!].map((payload, i) => (
          <Marker payload={{ searches: payload, key: "search" }} key={i} />
        ))}
      {!error &&
        showCrimes &&
        arrests[arrestsPage!].map((payload, i) => (
          <Marker payload={{ arrests: payload, key: "arrest" }} key={i} />
        ))}

      {error && <Error />}
    </>
  );
};

export default MapMarkers;
