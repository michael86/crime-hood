import { getGeoCoords } from "./utils";

test("api status", () => {
  getGeoCoords("leeds");
  expect([]);
});
