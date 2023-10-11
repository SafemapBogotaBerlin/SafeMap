export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Point {
  added_dttm: string;
  coordinates: Coordinates;
  danger_type: string;
  user_id: string;
}

export interface DataObject {
  [key: string]: Point;
}
