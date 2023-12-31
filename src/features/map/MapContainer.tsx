import "leaflet-contextmenu";
import "leaflet-contextmenu/dist/leaflet.contextmenu.css";
import MapMarkers from "./MapMarkers";
import ContextMenu from "./ContextMenu";
import useWindowDimensions, { useAppSelector } from "../../app/hooks";
import { MapContainer } from "react-leaflet";
import Sidebar from "./Sidebar";
import PanTo from "./PanTo";

const Map = () => {
  const locations = useAppSelector((state) => state.locations.geoCoords);
  const { height } = useWindowDimensions();

  return locations ? (
    <>
      <MapContainer
        center={[locations[0][0], locations[0][1]]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: `${height - 100}px` }}
        id="map"
        // @ts-ignore
        contextmenu={true}
        contextmenuWidth={140}
      >
        <ContextMenu />
        <MapMarkers />
        <Sidebar />
        <PanTo />
      </MapContainer>
    </>
  ) : null;
};

export default Map;
