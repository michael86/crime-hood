import { useAppDispatch } from "../../app/hooks";
import { setLocations } from "../slices/locationSlice";

type Props = {
  location: { display_name: string; lat: string; lon: string };
};

const SearchCards = ({ location }: Props) => {
  const submitLocation = (lat: number, lng: number) => dispatch(setLocations([[lat, lng]]));
  const dispatch = useAppDispatch();

  return (
    <div
      className="search-location--card"
      onClick={() => submitLocation(+location.lat, +location.lon)}
    >
      {" "}
      {location.display_name}{" "}
    </div>
  );
};

export default SearchCards;
