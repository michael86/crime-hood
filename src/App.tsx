import { useEffect } from "react";
import { useAppDispatch, useCurrentPosition } from "./app/hooks";
import { Locations, setLocations } from "./features/slices/locationSlice";
import Dashboard from "./features/dashboard/Dashboard";

function App() {
  const dispatch = useAppDispatch();

  const { position, error } = useCurrentPosition();

  useEffect(() => {
    if (error === undefined && position) {
      dispatch(setLocations([position] as Locations));
    }
  }, [position]);

  return (
    <>
      <h1>Crime Hood</h1>
      <Dashboard />
    </>
  );
}

export default App;
