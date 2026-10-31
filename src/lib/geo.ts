import { geoAlbersUsa, geoContains, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import us from "us-atlas/states-10m.json";
import { STATE_BY_FIPS } from "../data/states";

export type StateFeature = Feature<Geometry, { name: string }> & { id: string };

const topo = us as unknown as Topology<{ states: GeometryCollection<{ name: string }> }>;
const all = feature(topo, topo.objects.states) as FeatureCollection<Geometry, { name: string }>;

// Keep the 50 states and DC; drop territories the projection can't place.
export const STATE_FEATURES: StateFeature[] = all.features.filter(
  (f): f is StateFeature => typeof f.id === "string" && f.id in STATE_BY_FIPS,
);

export const MAP_WIDTH = 975;
export const MAP_HEIGHT = 610;
export const projection = geoAlbersUsa().scale(1300).translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);
export const pathFor = geoPath(projection);

// Location works on a normal web host. The claude.ai artifact frame blocks it,
// so that build hides the button instead of offering one that always fails.
function policyAllowsGeolocation(): boolean {
  const doc = document as Document & {
    permissionsPolicy?: { allowsFeature(f: string): boolean };
    featurePolicy?: { allowsFeature(f: string): boolean };
  };
  const policy = doc.permissionsPolicy ?? doc.featurePolicy;
  try {
    return policy ? policy.allowsFeature("geolocation") : true;
  } catch {
    return true;
  }
}

export const GEO_AVAILABLE =
  !__ARTIFACT__ && typeof navigator !== "undefined" && "geolocation" in navigator && policyAllowsGeolocation();

export class LocateError extends Error {}

// Finds the state containing the device's location. The coordinates are
// matched against the bundled map in the browser and never sent anywhere.
export function locateState(): Promise<string> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const point: [number, number] = [pos.coords.longitude, pos.coords.latitude];
        const hit = STATE_FEATURES.find((f) => geoContains(f, point));
        if (hit) resolve(STATE_BY_FIPS[hit.id].code);
        else reject(new LocateError("That location isn't inside a U.S. state. Pick your state from the list."));
      },
      (err) => {
        const msg =
          err.code === err.PERMISSION_DENIED
            ? "Location permission was turned down. Pick your state from the list instead."
            : "Couldn't get your location. Pick your state from the list instead.";
        reject(new LocateError(msg));
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
    );
  });
}
