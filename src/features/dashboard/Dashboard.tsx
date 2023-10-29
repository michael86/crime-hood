import React, { ReactElement } from "react";
import Map from "../map/MapContainer";
import SearchField from "../search_field/SearchField";

const Dashboard: React.FC = (): ReactElement => {
  return (
    <main>
      <SearchField />
      <Map />
    </main>
  );
};

export default Dashboard;
