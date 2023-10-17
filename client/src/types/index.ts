export type RegisterInitData = {
  displayName: string;
};

export type UserData = {
  id: string;
  email: string;
  name: string;
  created: string;
  notificationToken?: string;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Point = {
  added_dttm: number;
  coordinates: Coordinates;
  danger_type: string;
  user_id: string;
};

export type DataObject = {
  [key: string]: Point;
};

export type NavigationProp = {
  navigate(screen: string): void;
};
