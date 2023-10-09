import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useAppSelector } from "../../app/hooks";

import { LatLngExpression, Map } from "leaflet";
import { Coords } from "../../app/interfaces";

const UserLocation = () => {
  const [warning, setWarning] = useState<Boolean>(false);
  const { latitude, longitude }: Coords = useAppSelector((state) => state.api.locations);
  const map: Map = useMap();

  useEffect(() => {
    latitude & longitude && map.flyTo([latitude, longitude] as LatLngExpression, 13);
  }, [latitude, longitude]);

  return !warning ? (
    <button
      style={{ zIndex: 9999999999, position: "relative", marginTop: "1rem" }}
      disabled={warning && true}
    >
      {warning ? "please enable location sharing" : "View Crimes in your area"}
    </button>
  ) : null;
};

export default UserLocation;
