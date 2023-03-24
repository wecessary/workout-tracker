import { hasCompletedSetsAndExerciseNames } from "../../lib/analyticsUtils";
import { UserDataObject } from "../../model/model";

export const HasWorkoutData = ({
  cardsWidth,
  children,
  userData,
}: {
  cardsWidth: string;
  children: React.ReactNode;
  userData: UserDataObject[];
}) => {
  return !hasCompletedSetsAndExerciseNames(userData) ? (
    <div className={`${cardsWidth} flex justify-center items-center`}>
      Start working out to see your progress here.
    </div>
  ) : (
    <>{children}</>
  );
};
