import { ChangeEvent } from "react";

const FloatingLabel = ({
  value,
  onChange,
  label,
  localStyling,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  localStyling?: string;
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        id="floating_filled"
        className={`${localStyling} bg-white px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-500 dark:bg-gray-700 border-b border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor="floating_filled"
        className="absolute text-sm font-medium text-gray-900 duration-300 transform top-1 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-0 peer-placeholder-shown:translate-y-10 peer-focus:scale-75 peer-focus:-translate-y-1"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabel;
