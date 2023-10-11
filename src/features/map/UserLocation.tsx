import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useAppSelector } from "../../app/hooks";

import { LatLngExpression, Map } from "leaflet";

const UserLocation = () => {
  const [warning, setWarning] = useState<Boolean>(false);
  const location = useAppSelector((state) => state.locations);
  const map: Map = useMap();

  useEffect(() => {
    location && map.flyTo(location[0] as LatLngExpression, 13);
  }, [location]);

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
