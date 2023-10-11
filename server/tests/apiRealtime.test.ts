import { getDatabase, get, ref } from "firebase/database";
import { app } from "../models/db";
import { point } from "../models/pointsCold";
import { addRealTimePointModel, deleteRealTimeCollection } from "../models/pointsRealTime";

const database = getDatabase(app);
const collection = "testpoints";

describe("addRealTimePointModel", () => {
  afterAll(async () => {
    await deleteRealTimeCollection(collection);
  });

  it("should add a new point to the Realtime Database", async () => {
    const newPoint: point = {
      user_id: "testUser",
      added_dttm: "test timestamp",
      danger_type: "test danger",
      coordinates: {
        latitude: 10.00000000001,
        longitude: 10.00000000002,
      },
    };
    const testRef = ref(database, collection);
    await addRealTimePointModel(newPoint, collection);
    const gotPoint: any = await get(testRef);
    const gotObj: any = Object.values(gotPoint.val())[0];
    expect(gotObj.danger_type).toBe(newPoint.danger_type);
  });
});
