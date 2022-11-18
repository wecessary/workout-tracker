import { useCombobox } from "downshift";
import { useState } from "react";
import { UserDataObject } from "../model/model";
import { colour } from "../utilities/colour";

const exerciseNames = (userData: UserDataObject[]) => {
  const namesNestedArrays = userData.map((oneDay) => {
    const workout = oneDay.workoutData;
    return workout.map((exercise) => {
      if (exercise.name) {
        return exercise.name.trim();
      }
    });
    //array of names of one workout
  });
  const namesWithDuplicates = namesNestedArrays.flat().filter((x) => x);
  return namesWithDuplicates.filter(
    (val, index, self) => self.indexOf(val) === index
  );
};

const Autofill = ({
  userData,
  value,
  onChange,
}: {
  userData: UserDataObject[];
  value: string;
  onChange: (inputValue: string) => void;
}) => {
  const [inputItems, setInputItems] = useState(exerciseNames(userData));
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    inputValue,
  } = useCombobox({
    initialInputValue: value,
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        exerciseNames(userData).filter(
          (item) =>
            item &&
            item
              .toLowerCase()
              .includes(inputValue ? inputValue.toLowerCase() : "")
        )
      );
      onChange(inputValue || "");
    },
  });
  console.log(exerciseNames(userData));

  return (
    <div
      className={`${colour.main} ${colour.groupHover} col-span-10 w-full mb-3 font-bold text-lg tracking-tight text-white`}
    >
      <input
        className={`${colour.main} ${colour.groupHover} `}
        {...getInputProps()}
        data-testid="combobox-input"
        placeholder="Exercise name"
      />

      <ul className="font-normal" {...getMenuProps()}>
        {isOpen &&
          inputValue &&
          inputItems.map((item, index) => {
            if (index < 5) {
              return (
                <li
                  className={`${
                    highlightedIndex === index ? "font-bold" : null
                  }`}
                  key={`${item}${index}`}
                  {...getItemProps({
                    item,
                    index,
                  })}
                >
                  {item}
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default Autofill;
