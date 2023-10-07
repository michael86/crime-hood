import { LatLngExpression } from "leaflet";

import { MapContainer, useMap } from "react-leaflet";
import MapMarkers from "./MapMarkers";

import { useAppSelector } from "../../app/hooks";

const Map = () => {
  const { locations } = useAppSelector((state) => state.api);
  const center: LatLngExpression = locations;

  return (
    <>
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ height: "750px" }}>
        <MapMarkers />
      </MapContainer>
    </>
  );
};

export default Map;
