import { ReactNode } from "react";
import { ShowOptions } from "../model/model";

const Controller = ({
  children,
  currentExIndex,
  showOptions,
  attributeToShow,
}: {
  children: ReactNode;
  currentExIndex: number;
  showOptions: ShowOptions;
  attributeToShow: "showPopup" | "editCard";
}) => {
  const isCurrentExercise = showOptions.exerciseIndex === currentExIndex;
  const showAttribute = showOptions[attributeToShow];

  return isCurrentExercise && showAttribute ? <>{children}</> : null;
};

export default Controller;
