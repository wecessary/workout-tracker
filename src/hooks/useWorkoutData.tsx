import { useEffect, useState } from "react";
import { initialWorkoutData } from "../data/initalData";
import { SetUserData, UserDataObject } from "../model/model";

// //this does two things:
// //1. checks whether a workOut Object already exists for today's date. If not, one will create and added the userData
// //2. set today's workoutData to workoutData via setWorkoutData

const useWorkoutData = (
  userData: UserDataObject[],
  setUserData: SetUserData,
  selectedDate: string
) => {
  const [workoutData, setWorkoutData] = useState(initialWorkoutData);

  useEffect(() => {
    const newUserData = userData;
    const index = newUserData.findIndex((obj) => obj.date === selectedDate);
    if (index === -1) {
      newUserData.push({
        date: selectedDate,
        workoutData: initialWorkoutData,
      });
    }
    setUserData(newUserData);

    const indexOfSelectedWorkout = userData.findIndex(
      (obj) => obj.date === selectedDate
    );
    const todayWorkout = userData[indexOfSelectedWorkout].workoutData;
    setWorkoutData(todayWorkout);
  }, [selectedDate]);
  return { workoutData, setWorkoutData };
};

export default useWorkoutData;
