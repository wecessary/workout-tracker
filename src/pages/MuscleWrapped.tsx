import Stories from "react-insta-stories";
import { useContext, useState } from "react";
import { UserDataContext } from "../context/DataContext";
import {
  attendanceStats,
  getUserDataSinceXDaysAgo,
} from "../dataAnalysis/dataWrangleFunctions";

const MuscleWrapped = () => {
  const { datafromDB } = useContext(UserDataContext);
  const [userData, setUserData] = useState(datafromDB || []);
  const [uniqueDates, restTimes, durations] = attendanceStats(
    getUserDataSinceXDaysAgo(userData, 7)
  ) as [string[], number[], number[]];
  const workoutTime = Math.floor(
    durations.reduce((x: number, y: number) => x + y, 0) / 1000 / 60
  );
  const restTime = Math.floor(
    restTimes.reduce((x: number, y: number) => x + y, 0) / 1000 / 60
  );
  const totalTime = workoutTime + restTime;

  // {
  //   content: () => {
  //     return (
  //       <div className=" bg-pink-200 flex flex-col justify-center items-center w-screen h-screen ">
  //         <h1>
  //           <span>You lifted particularly hard with one exercise</span>
  //           <span className="mx-2">
  //             {
  //               getExerciseBestIn(getLastXdaysAllData(userData, 7), "weight")
  //                 .name
  //             }
  //           </span>
  //         </h1>
  //         <h1>At one point, you lifted</h1>
  //         <h1>
  //           {
  //             getExerciseBestIn(getLastXdaysAllData(userData, 7), "weight")
  //               .weight
  //           }
  //           {
  //             getExerciseBestIn(getLastXdaysAllData(userData, 7), "weight")
  //               .intensityUnit
  //           }
  //         </h1>
  //         <h1>
  //           You did{" "}
  //           {
  //             getExerciseBestIn(getLastXdaysAllData(userData, 7), "weight")
  //               .reps
  //           }{" "}
  //           {
  //             getExerciseBestIn(getLastXdaysAllData(userData, 7), "weight")
  //               .repsUnit
  //           }{" "}
  //           that time
  //         </h1>
  //       </div>
  //     );
  //   },
  // }
  const stories = [
    {
      content: () => {
        return (
          <div className=" bg-pink-200 flex flex-col justify-center items-center w-screen h-screen ">
            <h1>
              <span>You worked out </span>
              <span>{uniqueDates.length} </span>
              <span>times </span>
              <span>this week</span>
            </h1>
          </div>
        );
      },
    },
    {
      content: () => {
        return (
          <div className=" bg-pink-200 flex flex-col justify-center items-center w-screen h-screen ">
            <h1>
              <span>This week you spent</span>
              <span className="mx-2">{totalTime} minutes</span>
              <span> at the Muscle Department </span>
              <span>this week</span>
            </h1>
            <h1>Out of these minutes, you spent</h1>
            <h1>{restTime} minutes resting</h1>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Stories
        storyContainerStyles={{ position: "relative", zIndex: "10" }}
        stories={stories}
        defaultInterval={1500}
        width="100vw"
        height="100vh"
      />
    </>
  );
};

export default MuscleWrapped;
