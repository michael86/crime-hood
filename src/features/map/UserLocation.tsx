import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useAppSelector } from "../../app/hooks";

import { LatLngExpression, Map } from "leaflet";

const UserLocation = () => {
  const map: Map = useMap();
  const { locationShared } = useAppSelector((state) => state.user);
  console.log(locationShared);
  return locationShared ? (
    <button style={{ zIndex: 9999999999, position: "relative", marginTop: "1rem" }}>
      View crimes in your area
    </button>
  ) : null;
};

export default UserLocation;
