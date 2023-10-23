import { useMap } from "react-leaflet";
import {
  useAppDispatch,
  useAppSelector,
  useCurrentPosition,
} from "../../app/hooks";
import { setLocations } from "../slices/locationSlice";

const ContextMenu = () => {
  const map = useMap();
  const locations = useAppSelector((state) => state.locations);
  const currentLocation = useCurrentPosition();
  const dispatch = useAppDispatch();

  const goHome = () => {
    const pan = currentLocation.position || [locations[0][0], locations[0][1]];

    map.panTo(pan);
  };

  const ZoomOut = () => map.zoomOut();
  const ZoomIn = () => map.zoomIn();

  const updateLocation = ({ latlng }) => {
    console.log(latlng);
    latlng && dispatch(setLocations([[latlng.lat, latlng.lng]]));
  };

  map.contextmenu.removeAllItems();

  map.contextmenu.addItem({
    text: "go home",
    callback: goHome,
  });

  map.contextmenu.addItem({
    text: "Zoom out",
    callback: ZoomOut,
  });

  map.contextmenu.addItem({
    text: "Zoom in",
    callback: ZoomIn,
  });

  map.contextmenu.addItem({
    text: "View crimes here",
    callback: updateLocation,
  });
  return null;
};

export default ContextMenu;
