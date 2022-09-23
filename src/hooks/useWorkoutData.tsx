import { useEffect, useState } from "react";
import { initialWorkoutData } from "../data/initalData";
import { SetUserData, UserDataObject } from "../model/model";
import { currentDateAsNumber } from "../utilities/date";

  // //this does two things:
  // //1. checks whether a workOut Object already exists for today's date. If not, one will create and added the userData
  // //2. set today's workoutData to workoutData via setWorkoutData

const useWorkoutData = (userData: UserDataObject[], setUserData:SetUserData) => {
  const [workoutData, setWorkoutData] = useState(initialWorkoutData);

  useEffect(() => {
    const newUserData = userData;
    const index = newUserData.findIndex(
      (obj) => obj.date === currentDateAsNumber
    );
    if (index === -1) {
      newUserData.push({
        date: currentDateAsNumber,
        workoutData: initialWorkoutData,
      });
    }
    setUserData(newUserData);

    const indexOfTodayWorkout = userData.findIndex(
      (obj) => obj.date === currentDateAsNumber
    );
    const todayWorkout = userData[indexOfTodayWorkout].workoutData;
    setWorkoutData(todayWorkout);
  }, []);
  return {workoutData, setWorkoutData};
};

export default useWorkoutData;
