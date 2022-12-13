import { User } from "firebase/auth";
import {
  Set,
  SetWithAllDetails,
  SetWithStats,
  UserDataObject,
  UserDataObjectNamesAndDatesAllLevel,
  WorkoutDataObject,
  WorkoutDataObjectWithDate,
} from "../model/model";
import { currentDateAsString } from "../utilities/date";

export const getAllNames = (userData: UserDataObject[]) => {
  const namesNestedArrays = userData.map((oneDay) => {
    const workout = oneDay.workoutData;
    return workout.map((exercise) => {
      if (exercise.name) {
        return exercise.name.trim();
      }
    });
    //array of names of one workout
  });

  const namesWithDuplicates = namesNestedArrays.flat().filter((x) => x);
  return namesWithDuplicates.filter(
    (val, index, self) => self.indexOf(val) === index
  );
};

export const addAllDetailsToSets = (
  workoutData: WorkoutDataObjectWithDate[]
) => {
  return workoutData?.map((workoutDataObj) => {
    const OneExercise = workoutDataObj;
    const setsWithNameAndDate = OneExercise.sets?.map((set) => ({
      ...set,
      date: workoutDataObj.date,
      name: workoutDataObj.name,
      repsUnit: workoutDataObj.repsUnit,
      intensityUnit: workoutDataObj.intensityUnit,
    }));
    return { ...workoutDataObj, sets: setsWithNameAndDate };
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
    const allHaveDatesAndNames = addAllDetailsToSets(workoutDataWithDates);
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

export const getLastXdaysAllData = (userData: UserDataObject[], x: number) => {
  const xDaysAgo =
    new Date(currentDateAsString).valueOf() - x * 24 * 60 * 60 * 1000;
  return getPastWorkoutOnly(
    userData.filter((obj) => new Date(obj.date).valueOf() >= xDaysAgo)
  );
};

export const getSetsOnly = (userData: UserDataObject[]) => {
  const userDataDetailsAllLevel = addDateToWorkoutData(userData);
  const workoutDataOnly = userDataDetailsAllLevel.map((obj) => obj.workoutData);
  return workoutDataOnly
    .map((obj) => {
      const oneWorkout = obj;
      const arrayOfSets = oneWorkout.map((exercise) => exercise.sets);
      return arrayOfSets.flat();
    })
    .flat();
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
    };
  });
};

export const getSetsStatsWithTimeComplete = (userData: UserDataObject[]) => {
  const isSetWithStats = (
    set: SetWithStats | undefined
  ): set is SetWithStats => {
    return !!set;
  };

  const setsWithStats = getStatsFromSets(getSetsOnly(userData));
  return setsWithStats
    .map((set) => {
      if (set.timeComplete) {
        return set;
      }
    })
    .filter(isSetWithStats); //remove undefined elements
};

export const getTimeByDate = (userData: UserDataObject[]) => {
  const setsWithTimeComplete = getSetsStatsWithTimeComplete(userData);
  setsWithTimeComplete.map((set) => ({}));
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
  const setsWithStats = getStatsFromSets(getSetsOnly(userDataDatesAllLevels));

  return setsWithStats.filter((set) => set.name === exercise);
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

  return [reps, weights, restTimes, durations, uniqueDates];
};

export const getExerciseBestIn = (
  userData: UserDataObject[],
  metric: "reps" | "weight" | "restTime" | "duration"
) => {
  const pastWorkout = getPastWorkoutOnly(userData);
  const userDataDetailsAllLevel = addDateToWorkoutData(userData);
  const setsWithStats = getStatsFromSets(getSetsOnly(userDataDetailsAllLevel));

  return setsWithStats.reduce((prev, curr) =>
    prev[metric] > curr[metric] ? prev : curr
  );
};

export const getSum = (array: any[]) => {
  return array.reduce((a, b) => a + b, 0);
};

export const getMean = (array: any[]) => {
  return array.reduce((a, b) => a + b, 0) / array.length;
};

export const getMax = (array: any[]) => {
  return array.reduce((a, b) => Math.max(a, b), 0);
};

// export const sumGroupByDate = (
//   array: any[],
//   key: "date",
//   varaible: "totalTime" | "restTime"
// ) => {
//   interface SumGroupBy extends Record<"totalTime" | "restTime", any> {
//     date: string;
//   }

//   const sumGroupBy = [] as SumGroupBy[];
//   const foo = array.reduce((cache, obj) => {
//     if (!cache[obj[key]]) {
//       cache[obj[key]] = { [key]: obj[key], [varaible]: 0 };
//       sumGroupBy.push(cache[obj[key]]);
//     }
//     cache[obj[key]][varaible] += obj[varaible];
//     return cache;
//   }, {});
//   return sumGroupBy;
// };
interface GroupedSetsWithStats {
  [date: string]: number[];
}
// export const groupBy = (objectArray: any[], property: string) => {
//   return objectArray.reduce((cache, obj) => {
//     const key = obj[property]; // this would be e.g. "2022-10-11" = {...}.date
//     const currentGroup = cache[key] ?? []; //this stores all the objects in the current group
//     return { ...cache, [key]: [...currentGroup, obj] };
//   }, {}) as GroupedSetsWithStats;
// };

export const groupBy = (objectArray: any[], property: string, stat: string) => {
  return objectArray.reduce((cache, obj) => {
    const key = obj[property]; // this would be e.g. "2022-10-11" = {...}.date
    const currentGroup = cache[key] ?? []; //this stores all the objects in the current group
    return { ...cache, [key]: [...currentGroup, obj[stat]] };
  }, {}) as GroupedSetsWithStats;
};

export const sumGroupBy = (groupByArray: GroupedSetsWithStats) => {
  const arrayOfEachDay = Object.values(groupByArray);

  return arrayOfEachDay.map((day) => {
    return day.length === 1 ? day[0] : day.reduce((a, b) => a + b, 0);
  });
};
