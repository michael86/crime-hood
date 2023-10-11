import UserLocation from "./UserLocation";
import MapMarkers from "./MapMarkers";
import { MapContainer } from "react-leaflet";

import { useAppSelector } from "../../app/hooks";

import { useEffect } from "react";

const Map = () => {
  const locations = useAppSelector((state) => state.locations);

  useEffect(() => {}, [locations]);

  return locations ? (
    <>
      <MapContainer
        center={[locations[0][0], locations[0][1]]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "750px" }}
      >
        <UserLocation />
        <MapMarkers />
      </MapContainer>
    </>
  ) : null;
};

export default Map;
