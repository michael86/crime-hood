import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useState, useEffect } from "react";
import { Coords, Error } from "./interfaces";
import { LatLngExpression } from "leaflet";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useCurrentPosition() {
  const [position, setPosition] = useState<number[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    let canceled = false;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!canceled) {
          const { latitude, longitude } = position.coords;

          setPosition([latitude, longitude]);
        }
      },
      (error) => {
        console.log(error);
        if (!canceled) {
          setError(error);
        }
      }
    );

    return () => {
      canceled = true;
    };
  }, []);

  return { position, error };
}
