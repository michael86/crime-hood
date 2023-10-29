import axios from "axios";
import { useRef, useState } from "react";

import { GeoCodeData, GeoCodeRes } from "../../interfaces";
import SearchCards from "./SearchCards";

const SearchField = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchLocations, setSearchLocations] = useState<GeoCodeData[]>();

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
