import { useEffect } from "react";
import Dashboard from "./features/dashboard/Dashboard";
import { useAppDispatch, usePosition } from "./app/hooks";
import { LatLngExpression } from "leaflet";
import { setLocations } from "./features/api/apiSlice";

export interface Error {
  code: number;

  message: string;

  PERMISSION_DENIED: number;

  POSITION_UNAVAILABLE: number;

  TIMEOUT: number;
}

export interface Navigator {
  coords: Geo;
}

export interface Geo {
  latitude: number;
  longitude: number;
}

function App() {
  const dispatch = useAppDispatch();
  const DEFAULT_GEO: [number, number] = [51.505, -0.09];
  const position = usePosition();
  console.log(position);

  dispatch(setLocations(!position.error ? [position.latitude!, position.longitude!] : DEFAULT_GEO));

  return (
    <>
      <h1>Crime Hood</h1>
      <Dashboard />
    </>
  );
}

export default App;
