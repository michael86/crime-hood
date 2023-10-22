import L from "leaflet";

import "leaflet-contextmenu";
import "leaflet-contextmenu/dist/leaflet.contextmenu.css";
import UserLocation from "./UserLocation";
import MapMarkers from "./MapMarkers";
import useWindowDimensions, { useAppSelector } from "../../app/hooks";

import { MapContainer } from "react-leaflet";

const Map = () => {
  const locations = useAppSelector((state) => state.locations);
  const { height } = useWindowDimensions();

  // const ContextMenu = () => {
  //   var map = L.map("map", {
  //     contextmenu: true,
  //     contextmenuWidth: 140,
  //     contextmenuItems: [
  //       {
  //         text: "Show coordinates",
  //         callback: showCoordinates,
  //       },
  //       {
  //         text: "Center map here",
  //         callback: centerMap,
  //       },
  //       "-",
  //       {
  //         text: "Zoom in",
  //         icon: "images/zoom-in.png",
  //         callback: zoomIn,
  //       },
  //       {
  //         text: "Zoom out",
  //         icon: "images/zoom-out.png",
  //         callback: zoomOut,
  //       },
  //     ],
  //   });

  //   function showCoordinates(e) {
  //     alert(e.latlng);
  //   }

  //   function centerMap(e) {
  //     map.panTo(e.latlng);
  //   }

  //   function zoomIn(e) {
  //     map.zoomIn();
  //   }

  //   function zoomOut(e) {
  //     map.zoomOut();
  //   }
  //   return null;
  // };

  return locations ? (
    <>
      <MapContainer
        center={[locations[0][0], locations[0][1]]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: `${height - 100}px` }}
        id="map"
        contextmenu={true}
        contextmenuItems={[
          {
            text: "Zoom in",
            // callback: this.zoomIn,
          },
          {
            text: "Zoom out",
            // callback: this.zoomOut
          },
        ]}
      >
        <UserLocation />
        <MapMarkers />
        {/* <ContextMenu /> */}
      </MapContainer>
    </>
  ) : null;
};

export default Map;
