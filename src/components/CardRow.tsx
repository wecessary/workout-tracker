import { ReactNode } from "react";
import { DraggableProvided } from "react-beautiful-dnd";

const CardRow = ({
  children,
  rowStyling,
  ref,
}: {
  children: ReactNode;
  rowStyling?: string;
  ref?: any;
}) => {
  return (
    <div className={` ${rowStyling} flex justify-between`}>{children}</div>
  );
};

export default CardRow;
