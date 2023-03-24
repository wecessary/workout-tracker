import { useContext } from "react";
import { UserDataContext } from "../../context/DataContext";
import {
  attendanceStats,
  getUserDataSinceXDaysAgo,
  getSum,
} from "../../lib/analyticsUtils";
import { AppIcon } from "../../components/ui/Icons";
import Last7Days from "./Last7Days";
import LineGraph from "./LineChart";
import { colour } from "../../const/colour";
import { Header } from "./Header";
import { LeaderBoard } from "./Leaderboard";
import { HasWorkoutData } from "./HasWorkoutData";

const cardsWidth = "w-[95vw]";

const Analytics = () => {
  const { datafromDB } = useContext(UserDataContext);
  const userData = datafromDB || [];

  const [
    lastWeekDatesWorked,
    lastWeekRestTimes,
    lastWeekDurations,
    lastWeekNames,
    lastWeekUniqueNames,
  ] = attendanceStats(getUserDataSinceXDaysAgo(userData, 6));

  return (
    <>
      <div
        className={`min-h-screen ${colour.background} text-[#F5F5F5] flex flex-col items-center gap-4 pb-16 pt-4`}
      >
        <AppIcon className="w-20 h-20" />
        <Header text="YOUR PROGRESSION" cardsWidth={cardsWidth} />
        <HasWorkoutData userData={userData} cardsWidth={cardsWidth}>
          <LineGraph userData={userData} cardsWidth={cardsWidth} />
        </HasWorkoutData>
        <Header text="LAST 7 DAYS" cardsWidth={cardsWidth} />
        <HasWorkoutData userData={userData} cardsWidth={cardsWidth}>
          <Last7Days
            cardsWidth={cardsWidth}
            daysWorkedOut={lastWeekDatesWorked.length}
            numExDone={lastWeekUniqueNames.length}
            restTime={getSum(lastWeekRestTimes)}
            timeExercising={getSum(lastWeekDurations)}
            numSetsDone={lastWeekNames.length}
          />
        </HasWorkoutData>
        <Header text="ALL TIME LEADERBOARD" cardsWidth={cardsWidth} />
        <HasWorkoutData userData={userData} cardsWidth={cardsWidth}>
          <LeaderBoard cardsWidth={cardsWidth} userData={userData} />
        </HasWorkoutData>
      </div>
    </>
  );
};

export default Analytics;
