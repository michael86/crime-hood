import React, { ReactElement, useRef, useState } from "react";
import Map from "../map/MapContainer";
import axios from "axios";
import { useAppDispatch } from "../../app/hooks";
import { setLocations } from "../slices/locationSlice";

interface GeoCodeData {
  boundingbox: [string];
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  powered_by: string;
  type: string;
}

interface GeoCodeRes {
  status: number;
  data: [GeoCodeData];
}

const Dashboard: React.FC = (): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchLocations, setSearchLocations] = useState<GeoCodeData[]>();
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const location = inputRef.current?.value;
    if (!location?.length) return; //input field was empty so no need to get location geo

    const res: GeoCodeRes = await axios.get(
      `https://geocode.maps.co/search?q=${location.replace(" ", "+")}`
    );

    if (res.status !== 200) return; //Will add local state here to show error saying issue

    if (!res.data.length) return; //same as above but for warning saying location not found

    const validLocations = res.data.filter((entry) =>
      entry.display_name.toLowerCase().includes("united kingdom")
    );

    if (!validLocations.length) return; //again show error stating that we're unable to find the lcoation

    setSearchLocations(validLocations);
  };

  const submitLocation = (lat: number, lng: number) =>
    dispatch(setLocations([[lat, lng]]));

  return (
    <main>
      <form onSubmit={onSubmit}>
        <input
          type={"text"}
          placeholder="Search for town or city"
          ref={inputRef}
        />
        <button type="submit">Search</button>
        <div className="search-location--container">
          {searchLocations &&
            searchLocations.map((location) => {
              return (
                <div
                  className="search-location--card"
                  onClick={() => submitLocation(+location.lat, +location.lon)}
                >
                  {location.display_name}
                </div>
              );
            })}
        </div>
      </form>
      <Map />
    </main>
  );
};

export default Dashboard;
