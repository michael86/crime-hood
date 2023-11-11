import { useMap } from "react-leaflet";

const Sidebar = () => {
  const map = useMap();

  return (
    <>
      <div className="hamburger">
        <div className="hamburger--line"></div>
        <div className="hamburger--line"></div>
        <div className="hamburger--line"></div>
      </div>
    </>
  );
};

export default Sidebar;
