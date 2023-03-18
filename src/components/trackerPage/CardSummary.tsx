import { Set } from "../../model/model";
import { colour } from "../../const/colour";
import { getRepsTotal, getMaxMeanMinWeight } from "./cardSummaryCalculations";

const CardSummary = ({
  completedSets,
  intensityUnit,
}: {
  completedSets: Set[];
  intensityUnit: string;
}) => {
  return (
    <div className={`${colour.offWhite} leading-none pl-2`}>
      <h1>Completed sets: {completedSets.length}</h1>
      <h1>Completed reps: {getRepsTotal(completedSets)}</h1>
      <h1>
        Max weight: {getMaxMeanMinWeight(completedSets)[0]} {intensityUnit}
      </h1>
      <h1>
        Min weight: {getMaxMeanMinWeight(completedSets)[2]} {intensityUnit}
      </h1>
    </div>
  );
};

export default CardSummary;
