import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useAppSelector } from "../../app/hooks";

import { LatLngExpression, Map } from "leaflet";

const UserLocation = () => {
  const [warning, setWarning] = useState<Boolean>(false);
  const { locations } = useAppSelector((state) => state.api);
  const map: Map = useMap();

  useEffect(() => {
    locations.length && map.flyTo(locations as LatLngExpression, 13);
  }, [locations]);

  // const onClick = () => {
  //   map.flyTo()
  // }

  return !warning ? (
    <button
      style={{ zIndex: 9999999999, position: "relative", marginTop: "1rem" }}
      disabled={warning && true}
      // onClick={onClick}
    >
      {warning ? "please enable location sharing" : "View Crimes in your area"}
    </button>
  ) : null;
};

export default UserLocation;
