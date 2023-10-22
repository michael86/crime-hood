import { useAppSelector } from "../../app/hooks";

const UserLocation = () => {
  const { locationShared } = useAppSelector((state) => state.user);

  return locationShared ? (
    <button
      style={{ zIndex: 9999999999, position: "relative", marginTop: "1rem" }}
    >
      View crimes in your area
    </button>
  ) : null;
};

export default UserLocation;
