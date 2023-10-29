import { Marker as M, Popup } from "react-leaflet";
import { MarkerProps } from "../../interfaces";
import { icon } from "leaflet";
import ArrestPopup from "./ArrestPopup";
import SearchPopup from "./SearchPopup";

const handcuff = icon({
  iconUrl: "handcuff.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
});
const magnifying = icon({
  iconUrl: "magnifying_glass.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -32],
});

const Marker = ({ payload }: MarkerProps) => {
  const data = payload.arrests || payload.searches!;

  const icon = payload.arrests ? handcuff : magnifying;

  return (
    <M position={[+data.location?.latitude, +data.location?.longitude]} icon={icon}>
      <Popup className="popup">
        {payload.arrests && <ArrestPopup payload={payload.arrests} />}
        {payload.searches && <SearchPopup payload={payload.searches} />}
      </Popup>
    </M>
  );
};

export default Marker;
