interface coordinates {
  latitude: number;
  longitude: number;
}

interface point {
  user_id: string;
  added_dttm: string;
  danger_type: string;
  coordinates: coordinates;
}

describe(" Dummy Tests", () => {
  
  it("should create a new point as point", async () => {
    const testData: point = {
      user_id: "test user",
      added_dttm: "01 01 0001 00:02",
      danger_type: "test danger",
      coordinates: {
        latitude: 52.46837317833486,
        longitude: 13.43183324269434,
      },
    };

    
    expect(testData.danger_type).toBe(testData.danger_type);
  });
});
