import { ReactNode, SetStateAction, useState } from "react";
import { addSet, changeName, deleteExercise } from "../../lib/workoutDataUtils";
import {
  SlideAnimation,
  UserDataObject,
  WorkoutDataObject,
} from "../../model/model";
import PopUpMenu from "./PopUpMenu";
import { colour } from "../../const/colour";
import Autofill from "../ui/Autofill";
import { ChevronDown, ChevronUp, GripBar2 } from "../ui/Icons";
import { getCompletedSets } from "../../lib/cardSummaryUtils";
import CardSummary from "./CardSummary";
import { Grid } from "../ui/Grid";
import { animated, useSpring } from "@react-spring/web";
import SetRow from "./SetRow";
import Button from "../ui/Button";
import Comment from "./Comment";

const Card = ({
  userData,
  workoutData,
  setWorkoutData,
  workoutDataObj,
  exIndex,
}: {
  userData: UserDataObject[];
  workoutData: WorkoutDataObject[];
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void;
  workoutDataObj: WorkoutDataObject;
  exIndex: number;
}) => {
  const [spring, api] = useSpring(() => ({
    from: { opacity: 1, x: 0 },
  }));
  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetails = () => setShowDetails(!showDetails);

  const handleDeleteExercise = () => {
    api.start(() => ({
      opacity: 0,
      x: 50,
      onRest: () => setWorkoutData(deleteExercise(exIndex, workoutData)),
    }));
  };

  return (
    <animated.div
      style={{ ...spring }}
      className={`group p-3 w-[90vw] my-2 ${colour.cardColour} rounded-lg shadow-lg ${colour.hover}`}
    >
      <Grid>
        <PopUpMenu
          workoutData={workoutData}
          setWorkoutData={setWorkoutData}
          exIndex={exIndex}
          workoutDataObject={workoutDataObj}
          handleDeleteExercise={handleDeleteExercise}
        />
        <GripBar2 styling="col-start-5" />
        <button className="col-start-12" onClick={handleShowDetails}>
          {showDetails ? <ChevronUp /> : <ChevronDown />}
        </button>
      </Grid>
      <Grid>
        <div className="col-span-12">
          <Autofill
            userData={userData}
            value={workoutDataObj.name}
            onChange={(name) => {
              setShowDetails(true);
              setWorkoutData(changeName(name, exIndex, workoutData));
            }}
          />
        </div>
      </Grid>
      {showDetails ? (
        <>
          {workoutDataObj?.sets?.map((set, setIndex) => {
            return (
              <SetRow
                key={set.setId}
                workoutData={workoutData}
                setWorkoutData={setWorkoutData}
                obj={workoutDataObj}
                set={set}
                exIndex={exIndex}
                setIndex={setIndex}
              />
            );
          })}
          <Button
            variant="outline"
            onClick={() =>
              setWorkoutData(addSet(workoutDataObj.index, workoutData))
            }
          >
            +
          </Button>
          <Comment
            workoutDataObj={workoutDataObj}
            workoutData={workoutData}
            setWorkoutData={setWorkoutData}
          />
        </>
      ) : (
        <CardSummary
          completedSets={getCompletedSets(workoutDataObj)}
          intensityUnit={workoutDataObj.intensityUnit}
        />
      )}
    </animated.div>
  );
};

export default Card;
