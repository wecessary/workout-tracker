import { ReactNode } from "react";
import { Draggable } from "react-beautiful-dnd";

const DraggableWrapper = ({
  draggableId,
  draggableIndex,
  children,
}: {
  draggableId: string;
  draggableIndex: number;
  children: ReactNode;
  rowStyling?: string;
}) => {
  return (
    <Draggable draggableId={draggableId} index={draggableIndex}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableWrapper;
