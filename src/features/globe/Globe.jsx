import { useEffect } from "react";

import * as og from "@openglobus/og";

const _Globe = () => {
  useEffect(() => {
    let lat = 0;
    let long = 0;
    let alt = 0;

    let oldLat = 0;
    let oldLong = 0;
    let oldAlt = 0;

    let path = [];
    let update = false;

    let osm = new og.layer.XYZ("OpenStreetMap", {
      isBaseLayer: true,
      url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      visibility: true,
      attribution: "Data @ OpenStreetMap contributors, ODbL",
    });

    const globus = new og.Globe({
      target: "globus",
      name: "Earth",
      terrain: new og.terrain.GlobusTerrain(),
      layers: [osm],
    });
  }, []);

  return (
    <div>
      <div id="globus"></div>
    </div>
  );
};

export default _Globe;
