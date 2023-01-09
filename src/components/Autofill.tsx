import { useCombobox } from "downshift";
import { useEffect, useState } from "react";
import { attendanceStats } from "../dataAnalysis/dataWrangleFunctions";
import useOutsideClick from "../hooks/useOutsideClick";
import { UserDataObject } from "../model/model";
import { colour } from "../utilities/colour";

const Autofill = ({
  userData,
  value,
  onChange,
}: {
  userData: UserDataObject[];
  value: string;
  onChange: (inputValue: string) => void;
}) => {
  const allExNames = attendanceStats(userData)[4];
  const [inputItems, setInputItems] = useState(allExNames);
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    inputValue,
    setInputValue,
  } = useCombobox({
    initialInputValue: value,
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        allExNames.filter(
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

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const ref = useOutsideClick(() => ref.current?.blur());

  return (
    <div
      className={`${colour.cardColour} ${colour.groupHover} w-full mb-3 font-bold text-lg tracking-tight text-white ${colour.offWhitePlaceholder}`}
    >
      <input
        className={`${colour.cardColour} ${colour.groupHover} px-2 py-1 border-[#575656]`}
        {...getInputProps()}
        data-testid="combobox-input"
        placeholder="Type an exercise name"
        ref={ref}
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
