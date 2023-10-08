export interface Geo {
  latitude: number;
  longitude: number;
}

export interface Navigator {
  coords: Geo;
}

export interface Error {
  code: number;

  message: string;

  PERMISSION_DENIED: number;

  POSITION_UNAVAILABLE: number;

  TIMEOUT: number;
}
