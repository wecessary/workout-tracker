import {
  SetWithAllDetails,
  SetWithStats,
  UserDataObject,
  WorkoutDataObjectDetailsAllLevel,
  WorkoutDataObjectWithDate,
} from "../model/model";
import { currentDateAsString } from "../utilities/date";

export const addDetailsToSets = (workoutData: WorkoutDataObjectWithDate[]) => {
  return workoutData?.map((workoutDataObj) => {
    const OneExercise = workoutDataObj;
    const setsWithNameAndDate = OneExercise.sets?.map((set) => ({
      ...set,
      date: workoutDataObj.date,
      name: workoutDataObj.name,
      repsUnit: workoutDataObj.repsUnit,
      intensityUnit: workoutDataObj.intensityUnit,
    }));
    return {
      ...workoutDataObj,
      sets: setsWithNameAndDate,
    } as WorkoutDataObjectDetailsAllLevel;
  });
};

export const addDateToWorkoutData = (userData: UserDataObject[]) => {
  return userData.map((userObj) => {
    const oneDayOfUserData = userObj;
    const workoutDataWithDates = oneDayOfUserData.workoutData?.map(
      (workoutDataObj) => ({
        ...workoutDataObj,
        date: userObj.date,
      })
    );
    const allHaveDatesAndNames = addDetailsToSets(workoutDataWithDates);
    return {
      ...userObj,
      workoutData: allHaveDatesAndNames,
    };
  });
};

export const sortByDate = (userData: UserDataObject[]) => {
  return userData.sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
  );
};

export const sortByDateAscending = (userData: UserDataObject[]) => {
  return userData.sort(
    (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
  );
};

export const getPastWorkoutOnly = (userData: UserDataObject[]) => {
  return userData.filter((obj) => Date.now() > new Date(obj.date).valueOf());
};

export const getLastXWorkout = (userData: UserDataObject[], x: number) => {
  const pastWorkout = getPastWorkoutOnly(userData);
  return sortByDate(pastWorkout).slice(Math.max(userData.length - x, 0));
};

export const getLastXdaysAllData = (
  userData: UserDataObject[],
  days: number
) => {
  const xDaysAgo =
    new Date(currentDateAsString).valueOf() - days * 24 * 60 * 60 * 1000;
  return getPastWorkoutOnly(
    userData.filter((obj) => new Date(obj.date).valueOf() > xDaysAgo)
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
    const lastSet = i === arrayOfSets.length - 1;
    const SameDay = !lastSet && arrayOfSets[i].date === arrayOfSets[i + 1].date;
    const SameExercise =
      !lastSet && arrayOfSets[i].name === arrayOfSets[i + 1].name;
    const nextSetStarted =
      arrayOfSets[i + 1] && arrayOfSets[i + 1].timeStart ? true : false;

    const restTime =
      !lastSet && SameDay && SameExercise && nextSetStarted
        ? (arrayOfSets[i + 1].timeStart || 0) - (set.timeComplete || 0)
        : 0;
    const duration =
      set.timeComplete && set.timeStart ? set.timeComplete - set.timeStart : 0;
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
    return !!set;
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
    (val, index, self) => self.indexOf(val) === index
  );

  return [uniqueDates, restTimes, durations, names, uniqueNames];
};

export const getExerciseSets = (
  userData: UserDataObject[],
  exercise: string
) => {
  const userDataDatesAllLevels = addDateToWorkoutData(sortByDate(userData));
  const setsWithStats = getStatsFromSets(
    getSetsAllDetails(userDataDatesAllLevels)
  );

  return setsWithStats.filter((set) => {
    const setName = set.name || "";
    return setName.toLowerCase() === exercise.toLowerCase();
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

  return [reps, weights, restTimes, durations, uniqueDates, datesOnly];
};

export const getExerciseBestIn = (
  userData: UserDataObject[],
  metric: "reps" | "weight" | "restTime" | "duration"
) => {
  const pastWorkout = getPastWorkoutOnly(userData);
  const userDataDetailsAllLevel = addDateToWorkoutData(pastWorkout);
  const setsWithStats = getStatsFromSets(
    getSetsAllDetails(userDataDetailsAllLevel)
  );

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
  return array.reduce((a, b) => Math.max(a, b), 0);
};

export const getMin = (array: number[]) => {
  return array.reduce((a, b) => Math.min(a, b), 0);
};

interface GroupedSetsWithStats {
  [date: string]: number[];
}

export const groupBy = (
  setsWithStats: SetWithStats[],
  property: "date" | "name",
  stat: "reps" | "weight" | "totalTime" | "restTime" | "duration"
) => {
  return setsWithStats.reduce((cache, obj) => {
    const key = obj[property]; // this would be e.g. "2022-10-11" = {...}.date
    const currentGroup = cache[key] ?? []; //this stores all the objects in the current group
    return { ...cache, [key]: [...currentGroup, obj[stat]] };
  }, {} as GroupedSetsWithStats) as GroupedSetsWithStats;
};

export const sumGroupBy = (groupByArray: GroupedSetsWithStats) => {
  const arrayOfDailyWorkouts = Object.values(groupByArray);

  return arrayOfDailyWorkouts.map((day) => {
    return day.length === 1 ? day[0] : day.reduce((a, b) => a + b, 0);
  });
};
