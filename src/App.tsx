import Dashboard from "./features/dashboard/Dashboard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector, useCurrentPosition } from "./app/hooks";
import { Locations, setLocations } from "./features/slices/locationSlice";

function App() {
  const dispatch = useAppDispatch();

  const { position, error } = useCurrentPosition();
  const locations = useAppSelector((state) => state.locations);

  console.log(position);
  useEffect(() => {
    if (error === undefined && position) {
      const copy = [...locations];
      copy[0] = position;
      console.log("setting position", copy);
      dispatch(setLocations(copy as Locations));
    }
  }, [position]);

  console.log(locations);
  return (
    <>
      <h1>Crime Hood</h1>
      {/* <Dashboard /> */}
    </>
  );
}

export default App;
