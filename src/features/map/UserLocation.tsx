import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useAppDispatch } from "../.././app/hooks";
import { setLocations } from "../.././features/api/apiSlice";
import { Navigator, Error } from "./interfaces";
import { LatLngExpression, Map } from "leaflet";

const UserLocation = () => {
  const dispatch = useAppDispatch();
  const [warning, setWarning] = useState<Boolean>(false);
  const map: Map = useMap();

  useEffect(() => {
    const success = (location: Navigator) => {
      const { latitude, longitude } = location.coords;
      const geo: LatLngExpression = [latitude, longitude];

      dispatch(setLocations(geo));

      map.flyTo(geo, 13);
    };

    const error = (err: Error) => err.PERMISSION_DENIED === 1 && setWarning(true);

    navigator.geolocation.getCurrentPosition(success, error, {
      maximumAge: 0,
      enableHighAccuracy: true,
    });
  }, []);

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
