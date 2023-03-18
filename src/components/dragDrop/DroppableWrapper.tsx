import { ReactNode } from "react";
import { Droppable } from "react-beautiful-dnd";

const DroppableWrapper = ({
  children,
  droppableId,
}: {
  children: ReactNode;
  droppableId: string;
}) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableWrapper;
