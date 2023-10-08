import UserLocation from "./UserLocation";
import MapMarkers from "./MapMarkers";
import { MapContainer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useAppSelector } from "../../app/hooks";

const Map = () => {
  const { locations } = useAppSelector((state) => state.api);
  const DEFAULT_GEO: LatLngExpression = [51.505, -0.09];

  return (
    <>
      <MapContainer
        center={locations.length ? [locations[0], locations[1]] : DEFAULT_GEO}
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
