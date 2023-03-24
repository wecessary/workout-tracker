import { ComponentPropsWithRef } from "react";

interface InputTextProps extends ComponentPropsWithRef<"input"> {
  type: "text" | "password";
}

export const AuthInput = ({
  onChange,
  onMouseLeave,
  onTouchEnd,
  value,
  placeholder,
  type,
}: InputTextProps) => {
  return (
    <input
      onChange={onChange}
      onMouseLeave={onMouseLeave}
      onTouchEnd={onTouchEnd}
      className="border-2 bg-opacity-60 bg-zinc-800 focus:bg-zinc-900 rounded-xl px-8 py-6 w-72 text-white placeholder:text-gray-300"
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};
