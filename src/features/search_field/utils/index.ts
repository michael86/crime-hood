import axios from "axios";
import { GeoCodeData, GeoCodeRes } from "../../../interfaces";

export const getGeoCoords = async (value: string): Promise<string | GeoCodeData[]> => {
  const res: GeoCodeRes = await axios.get(
    `https://geocode.maps.co/search?q=${value.replace(" ", "+")}`
  );

  if (res.status !== 200) return "status";

  if (!res.data.length) return "not found";

  const validLocations = res.data.filter((entry) =>
    entry.display_name.toLowerCase().includes("united kingdom")
  );

  if (!validLocations.length) return "not found";

  return validLocations;
};
