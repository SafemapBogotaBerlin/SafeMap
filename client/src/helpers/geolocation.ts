import { Region } from 'react-native-maps';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Point = {
  added_dttm: number;
  coordinates: Coordinates;
  danger_type: string;
  user_id: string;
};

type DataObject = {
  [key: string]: Point;
};

export const geolocationHelper = {
  toRadians(degree: number) {
    return degree * (Math.PI / 180);
  },

  getDistance(coord1: Coordinates, coord2: Coordinates): number {
    const earthRadius = 6371e3;
    const lat1Rad = this.toRadians(coord1.latitude);
    const lat2Rad = this.toRadians(coord2.latitude);
    const deltaLat = this.toRadians(coord2.latitude - coord1.latitude);
    const deltaLon = this.toRadians(coord2.longitude - coord1.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c; //in meters
  },

  isMarkerVisible(coordinates: Coordinates, visibleRegion: Region | null) {
    if (!visibleRegion) return false;

    const latVisible =
      coordinates.latitude <=
        visibleRegion.latitude + visibleRegion.latitudeDelta / 2 &&
      coordinates.latitude >=
        visibleRegion.latitude - visibleRegion.latitudeDelta / 2;

    const longVisible =
      coordinates.longitude <=
        visibleRegion.longitude + visibleRegion.longitudeDelta / 2 &&
      coordinates.longitude >=
        visibleRegion.longitude - visibleRegion.longitudeDelta / 2;

    return latVisible && longVisible;
  },
  findPointsWithDanger(newData: DataObject, userLocation: Coordinates) {
    const dangerPoints: DataObject = {};

    if (newData) {
      Object.keys(newData).forEach((marker) => {
        if (this.getDistance(userLocation, newData[marker].coordinates) <= 50) {
          dangerPoints[marker] = newData[marker];
        }
      });
    }
    return dangerPoints;
  },
};
