import UserLocation from "./UserLocation";
import MapMarkers from "./MapMarkers";

import { MapContainer, useMapEvent } from "react-leaflet";
import useWindowDimensions, { useAppSelector } from "../../app/hooks";
import { popup } from "leaflet";

const Map = () => {
  const locations = useAppSelector((state) => state.locations);
  const { height } = useWindowDimensions();

  const ContextMenu = () => {
    const map = useMapEvent("contextmenu", (e) => {
      var menu = popup()
        .setLatLng(e.latlng)
        .setContent(
          "<p class='popup--list-item'>This will be the context menu, allowing us to get geo location as well as place markers and so on</p>"
        );

      menu.openOn(map);
      console.log(e);
    });

    return null;
  };

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
        <ContextMenu />
      </MapContainer>
    </>
  ) : null;
};

export default Map;
