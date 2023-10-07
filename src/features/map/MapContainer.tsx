import { LatLngExpression } from "leaflet";
import { useState } from "react";
import { MapContainer } from "react-leaflet";
import GlobeElements from "./MapMarkers";

const Map = () => {
  const DEFAULT_GEO: LatLngExpression = [51.505, -0.09];

  const [clicked, setClicked] = useState<boolean>(false);

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setClicked(!clicked);
  };

  return (
    <>
      <button onClick={onClick}>Go to your location</button>
      <MapContainer
        center={DEFAULT_GEO}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "500px" }}
      >
        <GlobeElements clicked={clicked} />
      </MapContainer>
    </>
  );
};

export default Map;
