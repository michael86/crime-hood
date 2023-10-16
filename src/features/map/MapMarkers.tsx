import "./map.css";

import axios from "axios";
import formatDateTime from "../../app/utils/dateTime";
import { useEffect } from "react";
import { TileLayer, Marker, Popup } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setArrests, setSearches } from "../slices/crimeSlice";
import { getCrimes, getStopSearches } from "../../endpoints";

const MapMarkers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searches } = useAppSelector((state) => state.crimes);
  const location = useAppSelector((state) => state.locations);

  const handleError = () => {
    console.log("error");
  };

  useEffect(() => {
    if (!location) return;

    const [lat, lng] = [location[0][0], location[0][1]];

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
      {searches.map((search, i) => {
        return (
          <Marker
            position={[+search.location?.latitude, +search.location?.longitude]}
            key={i}
          >
            <Popup className="popup--text">
              <h4>{search.type ? "person" : "vehicle"} Search</h4>

              {search.type && search.age_range && (
                <p>
                  A {search.gender ? search.gender.toLowerCase() : "individual"}
                  {search.age_range.includes("over")
                    ? ` ${search.age_range} years`
                    : `between the ages of ${search.age_range}`}{" "}
                  on the {formatDateTime(search.datetime)}
                </p>
              )}

              <ul>
                <li>gender: {search.gender || "Gender not provided"}</li>
                <li>involved_person: {search.involved_person}</li>
                <li>legislation: {search.legislation}</li>
                <li>location: {search.location.street.name}</li>
                <li>object_of_search: {search.object_of_search}</li>
                <li>
                  officer_defined_ethnicity: {search.officer_defined_ethnicity}
                </li>
                <li>operation: {search.operation}</li>
                <li>operation_name: {search.operation_name}</li>
                <li>outcome: {search.outcome}</li>
                <li>
                  outcome_linked_to_object_of_search:{" "}
                  {search.outcome_linked_to_object_of_search}
                </li>
                <li>outcome_object: {search.outcome_object?.name}</li>
                <li>
                  removal_of_more_than_outer_clothing:{" "}
                  {search.removal_of_more_than_outer_clothing}
                </li>
                <li>self_defined_ethnicity: {search.self_defined_ethnicity}</li>
              </ul>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default MapMarkers;
