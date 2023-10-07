import { TileLayer, Marker, Popup } from "react-leaflet";

import "./map.css";
import { useAppSelector } from "../../app/hooks";
import formatDateTime from "../../app/utils/dateTime";

const MapMarkers: React.FC = () => {
  /**Child component allowing use of ReactContext contianed within the useMap wrapper
   * This component will allow us to manipulate the map without causing a complete rerender*/

  const { crimes } = useAppSelector((state) => state.api);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {crimes.map((crime, i) => {
        return (
          <Marker position={[+crime.location?.latitude, +crime.location?.longitude]} key={i}>
            <Popup className="popup--text">
              <h4>{crime.type ? "person" : "vehicle"} Search</h4>

              {crime.type && crime.age_range && (
                <p>
                  A {crime.gender ? crime.gender.toLowerCase() : "individual"}
                  {crime.age_range.includes("over")
                    ? ` ${crime.age_range} years`
                    : `between the ages of ${crime.age_range}`}{" "}
                  on the {formatDateTime(crime.datetime)}
                </p>
              )}

              <ul>
                <li>gender: {crime.gender || "Gender not provided"}</li>
                <li>involved_person: {crime.involved_person}</li>
                <li>legislation: {crime.legislation}</li>
                <li>location: {crime.location.street.name}</li>
                <li>object_of_search: {crime.object_of_search}</li>
                <li>officer_defined_ethnicity: {crime.officer_defined_ethnicity}</li>
                <li>operation: {crime.operation}</li>
                <li>operation_name: {crime.operation_name}</li>
                <li>outcome: {crime.outcome}</li>
                <li>
                  outcome_linked_to_object_of_search: {crime.outcome_linked_to_object_of_search}
                </li>
                <li>outcome_object: {crime.outcome_object?.name}</li>
                <li>
                  removal_of_more_than_outer_clothing: {crime.removal_of_more_than_outer_clothing}
                </li>
                <li>self_defined_ethnicity: {crime.self_defined_ethnicity}</li>
              </ul>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default MapMarkers;
