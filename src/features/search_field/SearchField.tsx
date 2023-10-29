import axios from "axios";
import { useRef, useState } from "react";

import { GeoCodeData, GeoCodeRes } from "../../interfaces";
import SearchCards from "./SearchCards";
import "./search.css";
import { getGeoCoords } from "./utils";

const SearchField = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchLocations, setSearchLocations] = useState<GeoCodeData[]>();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputRef.current?.value.length) return;

    const validLocations = await getGeoCoords(inputRef.current?.value);

    if (typeof validLocations === "string") return;

    setSearchLocations(validLocations);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type={"text"} placeholder="Search for town or city" ref={inputRef} />
      <button type="submit">Search</button>

      {searchLocations && (
        <div className="search-location--container">
          {searchLocations.map((location, i) => (
            <SearchCards location={location} key={i} />
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchField;
