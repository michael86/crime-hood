import React from "react";
import { Marker as M, Popup } from "react-leaflet";
import { Arrests, Searches } from "../slices/crimeSlice";
import { icon } from "leaflet";
import ArrestPopup from "./ArrestPopup";
import SearchPopup from "./SearchPopup";

interface Props {
  payload: { arrests?: Arrests; searches?: Searches };
}

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

const Marker = ({ payload }: Props) => {
  const data = payload.arrests || payload.searches!;

  const icon = payload.arrests ? handcuff : magnifying;

  return (
    <M
      position={[+data.location?.latitude, +data.location?.longitude]}
      icon={icon}
    >
      <Popup>
        {payload.arrests && <ArrestPopup payload={payload.arrests} />}
        {payload.searches && <SearchPopup payload={payload.searches} />}
      </Popup>
    </M>
  );
};

export default Marker;
