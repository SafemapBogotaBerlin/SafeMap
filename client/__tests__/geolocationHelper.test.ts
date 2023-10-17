import { geolocationHelper } from '../src/helpers/geolocation';

describe('Tests for geolocationHelper', () => {

  // Testing toRadians function
  it("should convert degrees to radians", () => {
    expect(geolocationHelper.toRadians(180)).toEqual(Math.PI);
    expect(geolocationHelper.toRadians(90)).toEqual(Math.PI / 2);
    expect(geolocationHelper.toRadians(0)).toEqual(0);
  });

  // Testing getDistance function
  it("should calculate distance between two coordinates", () => {
    const coord1 = { latitude: 0, longitude: 0 };
    const coord2 = { latitude: 0, longitude: 1 };

    // You might need a known distance between these coordinates or compare against a known formula
    expect(geolocationHelper.getDistance(coord1, coord2)).toBeCloseTo(111194.92664455873);
  });

  // Testing isMarkerVisible function
  it("should check if a marker is visible within a region", () => {
    const marker = { latitude: 5, longitude: 5 };
    const region = {
      latitude: 5,
      longitude: 5,
      latitudeDelta: 2,
      longitudeDelta: 2
    };

    expect(geolocationHelper.isMarkerVisible(marker, region)).toBeTruthy();

    const markerOutside = { latitude: 8, longitude: 8 };
    expect(geolocationHelper.isMarkerVisible(markerOutside, region)).toBeFalsy();
  });

  it("should find points close to the user", () => {
    const points = {
      a: {
        added_dttm: Date.now(),
        coordinates: { latitude: 10, longitude: 10 },
        danger_type: 'type1',
        user_id: 'user1'
      },
      b: {
        added_dttm: Date.now(),
        coordinates: { latitude: 10.001, longitude: 10.001 },
        danger_type: 'type2',
        user_id: 'user2'
      }
    };

    const userLocation = { latitude: 10, longitude: 10 };

    const result = geolocationHelper.findPointsWithDanger(points, userLocation);
    expect(Object.keys(result)).not.toContain('b');
    expect(Object.keys(result)).toContain('a');
  });


});