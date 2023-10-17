import { useState, useEffect } from "react";
import { onValue } from "firebase/database";
import * as Location from "expo-location";
import { DataObject } from "../types";

export const useLocationData = (hotpoints) => {
  const [newData, setNewData] = useState<DataObject>({});
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    onValue(hotpoints, (snapshot) => {
      const fetchedData = snapshot.val();
      setNewData(fetchedData);
    });

    (async () => {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return { newData, location };
};