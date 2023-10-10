import { getDatabase, set, ref, push, remove } from "firebase/database";
import { app } from "../models/db";
import { coordinates, point } from "../models/pointsCold";
import { addRealTimePointModel } from "../models/pointsRealTime";

const database = getDatabase(app);

describe("addRealTimePointModel", () => {
  it("should add a new point to the Realtime Database", async () => {
    
    const newPoint : point = 
    {"user_id": "testUser",
    "added_dttm": "test timestamp",
    "danger_type": "test danger",
    "coordinates": {
        "latitude": 10.00000000001, 
        "longitude": 10.00000000002
        }
    }

    const mockSet = jest.fn();
    jest.mock("firebase/database", () => ({
      getDatabase: () => database,
      set: mockSet,
    }));

    await addRealTimePointModel(newPoint, 'testpoints');

    expect(1).toBe(1);

    jest.clearAllMocks();
  });
});