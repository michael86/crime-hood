import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useState, useEffect } from "react";
import { Coords, Error } from "./interfaces";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const usePosition = () => {
  const [position, setPosition] = useState<Coords>();
  const [error, setError] = useState<Error>();

  const onChange = ({ coords }: Coords) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const _onError = (error: Error) => {
    setError({ ...error });
  };

  const _success = (coords: Coords) => {
    console.log(coords);
  };

  useEffect(() => {
    const location = navigator.geolocation.getCurrentPosition(_success, _onError, {
      enableHighAccuracy: true,
    });

    console.log(location);
    if (!navigator.geolocation) {
      console.log("geo not active");
      setError({ message: "geo not active", PERMISSION_DENIED: 1 });
      return;
    }

    const watcher = navigator.geolocation.watchPosition(onChange, _onError);
    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  console.log(position);
  return { ...position, error };
};
