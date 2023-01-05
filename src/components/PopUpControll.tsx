import { ReactNode } from "react";
import { ShowOptions } from "../model/model";

const PopUpControll = ({
  children,
  currentExIndex,
  showOptions,
  attributeToShow,
}: {
  children: ReactNode;
  currentExIndex: number;
  showOptions: ShowOptions;
  attributeToShow: "showMenu" | "editCard";
}) => {
  const isCurrentExercise = showOptions.exerciseIndex === currentExIndex;
  const showAttribute = showOptions[attributeToShow];

  return isCurrentExercise && showAttribute ? <>{children}</> : null;
};

export default PopUpControll;
