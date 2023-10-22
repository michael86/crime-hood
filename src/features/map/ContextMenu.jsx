import { useMap } from "react-leaflet";
import { useAppSelector } from "../../app/hooks";

const ContextMenu = () => {
  const map = useMap();
  const { locations } = useAppSelector((state) => state);

  const goHome = () => {
    map.panTo([locations[0][0], locations[0][1]]);
  };

  const ZoomOut = () => map.zoomOut();
  const ZoomIn = () => map.zoomIn();

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

  return null;
};

export default ContextMenu;
