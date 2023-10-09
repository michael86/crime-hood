export interface Navigator {
  coords: Coords;
}

export interface Coords {
  latitude: number;
  longitude: number;
}

export interface Error {
  code?: number;

  message: string;

  PERMISSION_DENIED: number;

  POSITION_UNAVAILABLE?: number;

  TIMEOUT?: number;
}
