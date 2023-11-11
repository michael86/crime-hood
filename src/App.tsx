import React from "react";
import { useAppDispatch, useCurrentPosition } from "./app/hooks";
import { setLocations } from "./features/slices/locationSlice";

import Dashboard from "./features/dashboard/Dashboard";
import { setLocationShared } from "./features/slices/userSlice";
import Loader from "./features/loader/Loader";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { position, error } = useCurrentPosition();

  if (error === undefined && position) {
    dispatch(setLocations([position]));
    dispatch(setLocationShared({ locationShared: true }));
  }

  error && dispatch(setLocationShared({ locationShared: false }));

  return (
    <>
      <h1>Crime Hood</h1>
      {position || error ? <Dashboard /> : <Loader />}
    </>
  );
};

export default App;
