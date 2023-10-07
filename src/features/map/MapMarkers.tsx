import { TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { Navigator } from "./interfaces";
import data from "./test_data.json";
import "./map.css";

interface Props {
  clicked: boolean;
}
console.log(data);
const GlobeElements: React.FC<Props> = ({ clicked }) => {
  /**Child component allowing use of ReactContext contianed within the useMap wrapper
   * This component will allow us to manipulate the map without causing a complete rerender*/

  const DEFAULT_GEO: LatLngExpression = [51.505, -0.09];
  const map = useMap();

  const navigateToGeo = () => {
    const success = (position: Navigator) => {
      const geo: LatLngExpression = [
        position.coords.latitude,
        position.coords.longitude,
      ];

      map.flyTo(geo, map.getZoom());
    };
    navigator.geolocation && navigator.geolocation.getCurrentPosition(success);
  };

  clicked && navigateToGeo();

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={DEFAULT_GEO}>
        <Popup className="popup--text">Crime happened here</Popup>
      </Marker>
    </>
  );
};

export default GlobeElements;
