import Dashboard from "./features/dashboard/Dashboard";
import { useAppDispatch, useCurrentPosition } from "./app/hooks";
import { setLocations } from "./features/api/apiSlice";
import { Coords } from "./app/interfaces";

function App() {
  const dispatch = useAppDispatch();

  const [position, error] = useCurrentPosition();

  !error && dispatch(setLocations({ ...(position as Coords) }));

  return (
    <>
      <h1>Crime Hood</h1>
      <Dashboard />
    </>
  );
}

export default App;
