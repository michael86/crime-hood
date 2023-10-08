import UserLocation from "./UserLocation";
import MapMarkers from "./MapMarkers";
import { MapContainer } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const Map = () => {
  const DEFAULT_GEO: LatLngExpression = [51.505, -0.09];

  return (
    <>
      <MapContainer
        center={DEFAULT_GEO}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "750px" }}
      >
        <UserLocation />
        <MapMarkers />
      </MapContainer>
    </>
  );
};

export default Map;
