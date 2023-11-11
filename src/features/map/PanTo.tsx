import { useMap } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPanTo } from "../slices/locationSlice";

const PanTo = () => {
  const dispatch = useAppDispatch();
  const map = useMap();
  const { panTo, geoCoords } = useAppSelector((state) => state.locations);

  if (panTo) {
    map.panTo([geoCoords[0][0], geoCoords[0][1]]);
    dispatch(setPanTo(false));
  }

  return null;
};

export default PanTo;
