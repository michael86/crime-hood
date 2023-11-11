import { useAppDispatch } from "../../app/hooks";
import { GeoCodeData } from "../../interfaces";
import { setLocations, setPanTo } from "../slices/locationSlice";

type Props = {
  location: { display_name: string; lat: string; lon: string };
  setSearchLocations: React.Dispatch<React.SetStateAction<GeoCodeData[]>>;
};

const SearchCards = ({ location, setSearchLocations }: Props) => {
  const dispatch = useAppDispatch();

  const submitLocation = (lat: number, lng: number) =>
    dispatch(setLocations([[lat, lng]]));

  const onClick = () => {
    submitLocation(+location.lat, +location.lon);
    setSearchLocations([]);
    dispatch(setPanTo(true));
  };

  return (
    <div className="card--background">
      <div className="search-location--card" onClick={onClick}>
        {" "}
        {location.display_name}{" "}
      </div>
    </div>
  );
};

export default SearchCards;
