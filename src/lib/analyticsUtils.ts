import {
  ExerciseStats,
  SetWithAllDetails,
  SetWithStats,
  UserDataObject,
  WorkoutDataObjectDetailsAllLevel,
  WorkoutDataObjectWithDate,
  AttendanceStats,
  UserDataObjectNamesAndDatesAllLevel,
  LeaderBoardStats,
} from "../model/model";
import { currentDateAsString } from "./date";

export const addDetailsToSets = (
  workoutData: WorkoutDataObjectWithDate[]
): WorkoutDataObjectDetailsAllLevel[] => {
  return workoutData?.map((workoutDataObj: WorkoutDataObjectWithDate) => {
    const { date, name, repsUnit, intensityUnit, ...oneExercise } =
      workoutDataObj;
    const setsWithNameAndDate = oneExercise.sets?.map((set) => ({
      ...set,
      date,
      name,
      repsUnit,
      intensityUnit,
    }));
    return {
      ...oneExercise,
      sets: setsWithNameAndDate,
      date,
      name,
      repsUnit,
      intensityUnit,
    };
  });
};

export const addDateToWorkoutData = (
  userWorkoutData: UserDataObject[]
): UserDataObjectNamesAndDatesAllLevel[] => {
  return userWorkoutData.map((dailyUserData) => {
    const workoutDataWithDates = dailyUserData.workoutData?.map(
      (workoutDataObj) => ({
        ...workoutDataObj,
        date: dailyUserData.date,
      })
    ) as WorkoutDataObjectWithDate[];

    const workoutDataWithDetails = addDetailsToSets(workoutDataWithDates);

    return {
      ...dailyUserData,
      workoutData: workoutDataWithDetails,
    };
  });
};

export const sortByDateNewToOld = (userData: UserDataObject[]) => {
  return userData.sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
  );
};

export const sortByDateOldToNew = (userData: UserDataObject[]) => {
  return userData.sort(
    (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
  );
};

export const getPastWorkoutOnly = (userData: UserDataObject[]) => {
  return userData.filter((obj) => Date.now() > new Date(obj.date).valueOf());
};

export const getLastXWorkouts = (
  /* Give you the last logged workouts, regardless of when they were done. E.g.
   If you last workout was ten years ago, and you ask for the last workout, you will get this ten year ago workout */

  userData: UserDataObject[],
  x: number
) => {
  const pastWorkoutSorted = sortByDateNewToOld(getPastWorkoutOnly(userData));
  return pastWorkoutSorted.slice(0, Math.max(x, 0));
};

export const getUserDataSinceXDaysAgo = (
  userData: UserDataObject[],
  days: number
) => {
  const xDaysAgo =
    new Date(currentDateAsString).valueOf() - days * 24 * 60 * 60 * 1000;
  return getPastWorkoutOnly(
    userData.filter((obj) => new Date(obj.date).valueOf() >= xDaysAgo)
  );
};

export const getSetsAllDetails = (userData: UserDataObject[]) => {
  const userDataDetailsAllLevel = addDateToWorkoutData(userData);
  const arrayofEachDay = userDataDetailsAllLevel.map(
    (userData) =>
      userData.workoutData || ([] as WorkoutDataObjectDetailsAllLevel[]) // if workoutData is an empty array, can cause error
  );

  const arrayOfEachDaySets = arrayofEachDay.map((oneDay) => {
    return oneDay.reduce(
      (accumator, exercise) => accumator.concat(exercise.sets),
      [] as SetWithAllDetails[]
    );
  });

  return arrayOfEachDaySets.flat();
};

export const getStatsFromSets = (arrayOfSets: SetWithAllDetails[]) => {
  return arrayOfSets.map((set, i) => {
    const isLastSet = i === arrayOfSets.length - 1;
    const setExists = set ? true : false;
    const nextSetExists = arrayOfSets[i + 1] || null;

    const isSameDay =
      setExists &&
      nextSetExists &&
      !isLastSet &&
      arrayOfSets[i].date === arrayOfSets[i + 1].date;

    const isSameExercise =
      setExists &&
      nextSetExists &&
      !isLastSet &&
      arrayOfSets[i].name === arrayOfSets[i + 1].name;

    const nextSetStarted =
      arrayOfSets[i + 1] && arrayOfSets[i + 1].timeStart ? true : false;

    const restTime =
      !isLastSet && isSameDay && isSameExercise && nextSetStarted
        ? (arrayOfSets[i + 1].timeStart || 0) - (set.timeComplete || 0)
        : 0;
    const duration =
      setExists && set.timeComplete && set.timeStart
        ? set.timeComplete - set.timeStart
        : 0;
    return {
      ...set,
      duration,
      restTime,
      totalTime: duration + restTime,
    } as SetWithStats;
  });
};

export const getSetsStatsWithTimeComplete = (userData: UserDataObject[]) => {
  const isSetWithStats = (
    set: SetWithStats | undefined
  ): set is SetWithStats => {
    return !!set; // this lets typescript know to narrow down the type to SetWithStats if it returns true
    // otherwise the return type of set will still be SetWithStats | undefined
  };

  const setsWithStats = getStatsFromSets(getSetsAllDetails(userData));
  return setsWithStats
    .map((set) => {
      if (set.timeComplete) {
        return set;
      }
    })
    .filter(isSetWithStats); //remove undefined elements
};

export const attendanceStats = (userData: UserDataObject[]) => {
  const setsWithTimeComplete = getSetsStatsWithTimeComplete(userData);

  const datesOnly = setsWithTimeComplete.map((set) =>
    set && set.date ? set.date : ""
  );
  const uniqueDates = datesOnly.filter(
    (val, index, self) => self.indexOf(val) === index && val
  );

  const restTimes = setsWithTimeComplete.map((set) =>
    set && set.restTime ? set.restTime : 0
  );
  const durations = setsWithTimeComplete.map((set) =>
    set && set.duration ? set.duration : 0
  );

  const names = setsWithTimeComplete.map((set) => set.name);

  const uniqueNames = names.filter(
    (val, index, self) => self.indexOf(val) === index && val
  );

  return [
    uniqueDates,
    restTimes,
    durations,
    names,
    uniqueNames,
  ] as AttendanceStats;
};

export const getExerciseSets = (
  userData: UserDataObject[],
  exercise: string
) => {
  const setsWithStats = getStatsFromSets(
    getSetsAllDetails(sortByDateNewToOld(userData))
  );

  return setsWithStats.filter((set) => {
    const setName = set.name || "";
    return setName.toLowerCase().trim() === exercise.toLowerCase().trim();
  });
};

export const getExerciseStats = (
  userData: UserDataObject[],
  exercise: string
) => {
  const relevantSets = getExerciseSets(getPastWorkoutOnly(userData), exercise);

  const reps = relevantSets.map((set) => set.reps);
  const weights = relevantSets.map((set) => set.weight);
  const restTimes = relevantSets.map((set) => set.restTime);
  const durations = relevantSets.map((set) => set.duration);

  const datesOnly = relevantSets.map((set) =>
    set && set.date ? set.date : ""
  );
  const uniqueDates = datesOnly.filter(
    (val, index, self) => self.indexOf(val) === index && val
  );
  return [
    reps,
    weights,
    restTimes,
    durations,
    uniqueDates,
    datesOnly,
  ] as ExerciseStats;
};

export const getExerciseStatsObj = (
  userData: UserDataObject[],
  exercise: string
) => {
  const relevantSets = getExerciseSets(getPastWorkoutOnly(userData), exercise);

  return relevantSets
    .map((set) => ({
      name: exercise,
      reps: set.reps,
      weights: set.weight,
      restTimes: set.restTime,
      durations: set.duration,
      date: set && set.date ? set.date : "",
      unit: set.intensityUnit,
    }))
    .sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
};

export const getExerciseBestIn = (
  userData: UserDataObject[],
  metric: "reps" | "weight" | "restTime" | "duration"
) => {
  const pastWorkout = getPastWorkoutOnly(userData);
  const setsWithStats = getStatsFromSets(getSetsAllDetails(pastWorkout));

  return setsWithStats.reduce((prev, curr) =>
    prev[metric] > curr[metric] ? prev : curr
  );
};

export const getSum = (array: number[]) => {
  return array.reduce((a, b) => a + b, 0);
};

export const getMean = (array: number[]) => {
  return Math.round(array.reduce((a, b) => a + b, 0) / array.length);
};

export const getMax = (array: number[]) => {
  return array.length ? Math.max.apply(null, array) : 0;
};

export const getMin = (array: number[]) => {
  return array.length ? Math.min.apply(null, array) : 0;
};

//I don't want to work on this project anymore. ChatGPT wrote this
export const getLeaderBoardStats = (
  userData: UserDataObject[]
): LeaderBoardStats[] => {
  const exerciseMap: Map<string, { reps: number; lastDate: string }> =
    new Map();

  userData.forEach((dailyUserData) => {
    dailyUserData.workoutData?.forEach((workoutDataObj) => {
      const exercise = workoutDataObj.name;
      const completedSets = workoutDataObj.sets?.filter(
        (set) => set.timeComplete
      );

      if (completedSets?.length > 0) {
        const reps = completedSets.reduce((total, set) => total + set.reps, 0);
        const existingData = exerciseMap.get(exercise);

        if (existingData) {
          exerciseMap.set(exercise, {
            reps: existingData.reps + reps,
            lastDate:
              new Date(dailyUserData.date) > new Date(existingData.lastDate)
                ? dailyUserData.date
                : existingData.lastDate,
          });
        } else {
          exerciseMap.set(exercise, {
            reps: reps,
            lastDate: dailyUserData.date,
          });
        }
      }
    });
  });

  const currentDate = new Date();

  const leaderBoardStats = Array.from(exerciseMap.entries()).map(
    ([exerciseName, { reps, lastDate }]) => {
      const lastCompletedDate = new Date(lastDate);
      const daysSinceLastCompleted = Math.floor(
        (currentDate.getTime() - lastCompletedDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      return {
        exerciseName,
        numberOfRepsCompleted: reps,
        daysSinceLastCompleted,
      };
    }
  );

  return leaderBoardStats.sort(
    (a, b) => b.numberOfRepsCompleted - a.numberOfRepsCompleted
  );
};

export const hasCompletedSetsAndExerciseNames = (
  userData: UserDataObject[]
): boolean => {
  return userData.some((userObj) => {
    return userObj?.workoutData?.some((workoutDataObj) => {
      return (
        workoutDataObj?.name &&
        workoutDataObj?.sets?.some((set) => set.timeComplete)
      );
    });
  });
};
