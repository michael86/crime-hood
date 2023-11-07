import { useRef, useState } from "react";
import { GeoCodeData } from "../../interfaces";
import SearchCards from "./SearchCards";
import "./search.css";
import { getGeoCoords } from "./utils";

const SearchField = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchLocations, setSearchLocations] = useState<GeoCodeData[]>([]);
  const [warning, setWarning] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setWarning(null);

    if (!inputRef.current?.value.length) {
      setWarning("invalid location");
      return;
    }

    const validLocations = await getGeoCoords(inputRef.current?.value);

    if (typeof validLocations === "string") {
      validLocations === "status"
        ? setWarning(
            "there seems to be an issue our end, please hold tight and try again later"
          )
        : setWarning("That locations wasn't found, are you sure it exists");
      return;
    }

    setSearchLocations(validLocations);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="input-container">
        <input
          type={"text"}
          placeholder="Search for town or city"
          ref={inputRef}
        />
        <button type="submit">Search</button>
      </div>
      {warning && <h3 className="input-warning">{warning}</h3>}

      {searchLocations && (
        <div className="search-location--container">
          {searchLocations.map((location, i) => (
            <SearchCards
              location={location}
              setSearchLocations={setSearchLocations}
              key={i}
            />
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchField;
