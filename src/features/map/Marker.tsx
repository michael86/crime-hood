import { Marker as M, Popup } from "react-leaflet";
import { Arrests, MarkerProps, Searches } from "../../interfaces";
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
  let data: Arrests | Searches, icon;

  switch (payload.key) {
    case "arrest":
      data = payload.arrests!;
      icon = handcuff;
      break;
    case "search":
      data = payload.searches!;
      icon = magnifying;
      break;
    default:
      break;
  }

  return (
    <M
      position={[+data!.location?.latitude, +data!.location?.longitude]}
      icon={icon}
      key={Math.random()}
    >
      <Popup className="popup">
        {payload.key === "arrest" ? (
          <ArrestPopup payload={payload.arrests} />
        ) : (
          <SearchPopup payload={payload.searches} />
        )}
      </Popup>
    </M>
  );
};

export default Marker;
