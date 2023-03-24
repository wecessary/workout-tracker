import { Fragment } from "react";
import { getLeaderBoardStats } from "../../lib/analyticsUtils";
import { UserDataObject } from "../../model/model";

export const LeaderBoard = ({
  userData,
  cardsWidth,
}: {
  cardsWidth: string;
  userData: UserDataObject[];
}) => {
  return (
    <>
      <div className={`${cardsWidth} grid grid-flow-row grid-cols-12 mt-4`}>
        <div className="col-start-7 col-span-3 p-2 text-xs">REPS COMPLETED</div>
        <div className="col-span-3 text-xs p-2">DAYS SINCE LAST REP</div>
        <div className="col-span-12 border-b-2 " />
        {getLeaderBoardStats(userData).map(
          (
            { exerciseName, numberOfRepsCompleted, daysSinceLastCompleted },
            i
          ) => {
            return (
              <Fragment key={i}>
                <div className="col-span-6 border-b-2 p-2">{exerciseName}</div>
                <div className="border-x-2 border-b-2 col-span-3 p-2">
                  {numberOfRepsCompleted}
                </div>
                <div className="col-span-3 border-b-2 p-2">
                  {daysSinceLastCompleted}
                </div>
              </Fragment>
            );
          }
        )}
      </div>
    </>
  );
};
