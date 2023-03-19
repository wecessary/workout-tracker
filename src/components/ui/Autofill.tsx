import { useCombobox } from "downshift";
import { MutableRefObject, useEffect, useState } from "react";
import { attendanceStats } from "../../lib/analyticsUtils";
import useOutsideClick from "../../hooks/useOutsideClick";
import { UserDataObject } from "../../model/model";
import { colour } from "../../const/colour";

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
    <>
      <input
        className={`${colour.cardColour} ${colour.groupHover} font-bold px-2 py-1 text-white text-lg w-full`}
        {...getInputProps({ ref: ref as MutableRefObject<HTMLInputElement> })}
        data-testid="combobox-input"
        placeholder="Type an exercise name"
      />

      <ul className="text-white text-lg" {...getMenuProps()}>
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
    </>
  );
};

export default Autofill;
