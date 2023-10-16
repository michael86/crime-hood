import React from "react";
import { Marker as M } from "react-leaflet";
import { Arrests } from "../slices/crimeSlice";
import { icon } from "leaflet";
import Popup from "./Popup";

interface Props {
  payload: Arrests;
}

const handcuff = icon({
  iconUrl: "handcuff.png",
  iconSize: [20, 20], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const Marker = ({ payload }: Props) => {
  console.log(payload);
  return (
    <M
      position={[+payload.location?.latitude, +payload.location?.longitude]}
      icon={handcuff}
    >
      <Popup payload={payload} />
    </M>
  );
};

export default Marker;
