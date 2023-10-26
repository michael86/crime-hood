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

export interface UserInterface {
  locationShared?: boolean;
}

export interface GeoCodeData {
  boundingbox: [string];
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  powered_by: string;
  type: string;
}

export interface GeoCodeRes {
  status: number;
  data: [GeoCodeData];
}

export interface ArrestPopupProps {
  payload: Arrests;
}

export interface MarkerProps {
  payload: { arrests?: Arrests; searches?: Searches };
}

export type CrimeInterface = {
  arrests: Arrests[] | [];
  searches: Searches[] | [];
};

export interface Arrests {
  category: string;
  context: string;
  id: number;
  location: {
    latitude: string;
    street: { id: number; name: string };
    longitude: string;
  };
  location_subtype: string;
  location_type: string;
  month: string;
  outcome_status: { category: string; date: string };
  persistent_id: string;
}

export interface Searches {
  age_range: string | null;
  datetime: string;
  gender: string | null;
  involved_person: boolean | null;
  legislation: string | null;
  location: {
    latitude: string;
    longitude: string;
    street: { id: number; name: string };
  };
  object_of_search: null | string | boolean;
  officer_defined_ethnicity: string | null;
  operation: boolean | null;
  operation_name: string | null;
  outcome: string | null;
  outcome_linked_to_object_of_search: null | boolean;
  outcome_object: { id: string; name: string } | null;
  removal_of_more_than_outer_clothing: null | boolean;
  self_defined_ethnicity: string | null;
  type: string | null;
}

export interface SearchPopupProps {
  payload: Searches;
}
