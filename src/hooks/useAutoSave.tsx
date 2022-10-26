import { SetStateAction, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { writeUserData } from "../firebae/firebase";
import { UserDataObject, WorkoutDataObject } from "../model/model";

const useAutoSave = (
  userData: UserDataObject[],
  selectedDate: string,
  setUserData: (value: SetStateAction<UserDataObject[]>) => void,
  workoutData: WorkoutDataObject[]
) => {
  const [isSavingUserData, setIsSavingUserData] = useState(false);
  const [hasSavedUserData, setHasSavedUserData] = useState(false);

  const { user } = useContext(AuthContext);
  const uid = user ? user.uid : "invalidUid";

  useEffect(() => {
    const newUserData = userData;
    const index = newUserData.findIndex((obj) => obj.date === selectedDate);
    if (index === -1) {
      newUserData.push({
        date: selectedDate,
        workoutData: workoutData,
      });
    } else {
      newUserData[index].workoutData = workoutData;
    }
    setUserData(newUserData);
    const timer = setTimeout(() => {
      writeUserData(uid, newUserData, setIsSavingUserData, setHasSavedUserData);
    }, 3000);
    return () => clearTimeout(timer);
  }, [workoutData]);

  return {
    isSavingUserData,
    hasSavedUserData,
    setIsSavingUserData,
    setHasSavedUserData,
  };
};

export default useAutoSave;
