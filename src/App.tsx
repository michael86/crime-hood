import React from "react";

import Dashboard from "./features/dashboard/Dashboard";
import { useAppDispatch } from "./app/hooks";
import { setLocations } from "./features/api/apiSlice";
import { LatLngExpression } from "leaflet";

interface Pos {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface Error {
  err: {
    code: string;
    message: string;
  };
}

function App() {
  const DEFAULT_GEO: LatLngExpression = [51.505, -0.09];
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const success = (location: Pos) => {
      const { latitude, longitude } = location.coords;
      dispatch(setLocations([latitude, longitude]));
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    <>
      <h1>Crime Hood</h1>
      <Dashboard />
    </>
  );
}

export default App;
