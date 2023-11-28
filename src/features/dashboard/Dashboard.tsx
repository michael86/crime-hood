import React, { ReactElement } from "react";
import Map from "../map/MapContainer";
import SearchField from "../search_field/SearchField";
import PageSelect from "../page_select/PageSelect";

const Dashboard: React.FC = (): ReactElement => {
  return (
    <main>
      <SearchField />
      <PageSelect />
      <Map />
    </main>
  );
};

export default Dashboard;
