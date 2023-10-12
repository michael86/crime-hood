import UserLocation from "./UserLocation";
import MapMarkers from "./MapMarkers";
import { MapContainer } from "react-leaflet";
import useWindowDimensions, { useAppSelector } from "../../app/hooks";

const Map = () => {
  const locations = useAppSelector((state) => state.locations);
  const { height } = useWindowDimensions();

  return locations ? (
    <>
      <MapContainer
        center={[locations[0][0], locations[0][1]]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: `${height - 100}px` }}
      >
        <UserLocation />
        <MapMarkers />
      </MapContainer>
    </>
  ) : null;
};

export default Map;
