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
    setSearchLocations([]);

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
    <div className="header--container">
      <form onSubmit={onSubmit} className="search-form">
        <div className="input-container">
          <input
            type={"text"}
            ref={inputRef}
            name="search"
            id="search"
            placeholder=" "
          />
          <label htmlFor="search">Search for Town/City/Postcode</label>
        </div>

        <button type="submit">Search</button>
      </form>

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
    </div>
  );
};

export default SearchField;
