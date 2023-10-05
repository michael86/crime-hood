import BingMapsReact from "bingmaps-react";
import { useEffect, useState } from "react";

const Globe = () => {
  const BING_KEY: string = "Enter your bing key";
  const DEFAULT_GEO = [51.504681143682795, -0.12620215682789807];

  const [geoLocation, setGeoLocation] = useState<Geo>();

  interface Geo {
    latitude: number;
    longitude: number;
  }

  interface Navigator {
    coords: Geo;
  }

  useEffect(() => {
    const success = (position: Navigator) => position.coords && setGeoLocation(position.coords);
    navigator.geolocation && navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    <BingMapsReact
      bingMapsKey={BING_KEY}
      height="500px"
      width="500px"
      mapOptions={{
        navigationBarMode: "square",
      }}
      viewOptions={{
        center: geoLocation
          ? { latitude: geoLocation.latitude, longitude: geoLocation.longitude }
          : { latitude: 0.0, longitude: -0.0 },
        mapTypeId: "aerial",
      }}
    />
  );
};

export default Globe;
