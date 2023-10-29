import { useMap } from "react-leaflet";
import { useAppDispatch, useAppSelector, useCurrentPosition } from "../../app/hooks";
import { setLocations } from "../slices/locationSlice";
import { LatLngExpression } from "leaflet";
import { UpdateLocation } from "../../interfaces";

const ContextMenu = () => {
  const map = useMap();
  const locations = useAppSelector((state) => state.locations);
  const currentLocation = useCurrentPosition();
  const dispatch = useAppDispatch();

  const goHome = () => {
    const pan = currentLocation.position || [locations[0][0], locations[0][1]];
    map.panTo(pan as LatLngExpression);
  };

  const ZoomOut = () => map.zoomOut();
  const ZoomIn = () => map.zoomIn();

  const updateLocation = ({ latlng }: UpdateLocation) =>
    latlng && dispatch(setLocations([[latlng.lat, latlng.lng]]));

  // @ts-ignore
  map.contextmenu.removeAllItems();

  // @ts-ignore
  map.contextmenu.addItem({
    text: "go home",
    callback: goHome,
  });

  // @ts-ignore
  map.contextmenu.addItem({
    text: "Zoom out",
    callback: ZoomOut,
  });

  // @ts-ignore
  map.contextmenu.addItem({
    text: "Zoom in",
    callback: ZoomIn,
  });

  // @ts-ignore
  map.contextmenu.addItem({
    text: "View crimes here",
    callback: updateLocation,
  });
  return null;
};

export default ContextMenu;
