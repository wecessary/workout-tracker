import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const initalSets = [
  { index: 0, reps: 0, weight: 0, easy: true, done: false },
  { index: 1, reps: 1, weight: 1, easy: true, done: false },
  { index: 2, reps: 2, weight: 2, easy: true, done: false },
  { index: 3, reps: 3, weight: 3, easy: true, done: false },
  { index: 4, reps: 4, weight: 4, easy: true, done: false },
];

const DnD = () => {
  const [sets, setSets] = useState(initalSets);
  const [binDisable, setBinDisable] = useState(true);
  function handleBeforeCapture() {
    setBinDisable(false);
  }

  function handleOnDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === "characters") {
      console.log(result);
      const newArray = Array.from(sets);
      const [draggedItem] = newArray.splice(result.source.index, 1);
      newArray.splice(result.destination.index, 0, draggedItem);
      setSets(newArray.map((item, i) => ({ ...item, index: i })));
    }

    if (result.destination.droppableId === "bin") {
      const newArray = Array.from(sets);
      newArray.splice(result.source.index, 1);
      setSets(newArray.map((item, i) => ({ ...item, index: i })));
      setBinDisable(true);
    }
  }
  console.log(binDisable);
  return (
    <DragDropContext
      onBeforeCapture={handleBeforeCapture}
      onDragEnd={handleOnDragEnd}
    >
      <div className="App flex flex-col items-center">
        <header className="App-header">
          <h1>Final Space Characters</h1>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {sets.map(({ index, reps }, i) => {
                  return (
                    <Draggable
                      key={index}
                      draggableId={String(index)}
                      index={i}
                    >
                      {(provided) => (
                        <li
                          className="mx-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <p>{reps}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <Droppable droppableId="bin" isDropDisabled={binDisable}>
            {(provided) => (
              <div
                className={
                  binDisable
                    ? "opacity-0 text-black text-4xl"
                    : " opacity-100 text-black text-4xl"
                }
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                Bin
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </header>
      </div>
    </DragDropContext>
  );
};

export default DnD;
