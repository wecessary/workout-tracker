import { ChangeEvent, MutableRefObject } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { colour } from "../../const/colour";

interface RepsWeightInput {
  repsOrWeight: string;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  labelStyling?: string;
}

const InputNumber = ({ value, onChange }: RepsWeightInput) => {
  const ref = useOutsideClick(() => ref.current?.blur());
  return (
    <>
      <input
        ref={ref as MutableRefObject<HTMLInputElement>}
        type="number"
        placeholder="10"
        value={value || ""}
        className={`${colour.cardColour} ${colour.groupHover} p-2 w-1/2 text-center text-[#D9D9D9] mr-1 placeholder:opacity-40 border-b-2 border-b-zinc-500`}
        onChange={(e) => onChange(e)}
      />
    </>
  );
};

export default InputNumber;
