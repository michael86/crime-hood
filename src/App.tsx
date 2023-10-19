import React from "react";
import { useAppDispatch, useCurrentPosition } from "./app/hooks";
import { setLocations } from "./features/slices/locationSlice";
import Dashboard from "./features/dashboard/Dashboard";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { position, error } = useCurrentPosition();

  error === undefined && position && dispatch(setLocations([position]));

  return (
    <>
      <h1>Crime Hood</h1>
      {position || error ? <Dashboard /> : "getting position"}
    </>
  );
};

export default App;
