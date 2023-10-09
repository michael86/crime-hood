import UserLocation from "./UserLocation";
import MapMarkers from "./MapMarkers";
import { MapContainer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useAppSelector } from "../../app/hooks";
import { Locations } from "../api/interfaces";
import { Coords } from "../../app/interfaces";

const Map = () => {
  const { latitude, longitude }: Coords = useAppSelector((state) => state.api.locations);

  return (
    <>
      <MapContainer
        center={[latitude, longitude]}
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
