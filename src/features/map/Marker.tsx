import React from "react";
import { Marker as M, Popup } from "react-leaflet";
import { Arrests, Searches } from "../slices/crimeSlice";
import { icon } from "leaflet";

interface Props {
  payload: { arrests?: Arrests; searches?: Searches };
}

const handcuff = icon({
  iconUrl: "handcuff.png",
  iconSize: [20, 20], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
const magnifying = icon({
  iconUrl: "magnifying_glass.png",
  iconSize: [30, 30], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const Marker = ({ payload }: Props) => {
  const data = payload.arrests || payload.searches!;
  const popup = payload.arrests ? "arrest" : "search";
  const icon = payload.arrests ? handcuff : magnifying;

  return (
    <M
      position={[+data.location?.latitude, +data.location?.longitude]}
      icon={icon}
    >
      <Popup>{popup}</Popup>
    </M>
  );
};

export default Marker;
