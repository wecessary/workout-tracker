import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "transparent" | "listGroup" | "outline";
  localStyling?: string;
}

const Button = forwardRef(
  (
    { children, onClick, variant, localStyling, disabled }: ButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    const primary =
      "text-[#575555] bg-white hover:bg-[#C8C8C8] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
    const secondary =
      "text-white bg-slate-400 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

    const outline =
      "disabled:opacity-50 disabled:hover:bg-transparent text-[#575555] bg-transparent border border-black hover:bg-[#C8C8C8] font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

    const transparent =
      "text-sm shadow-md rounded-md bg-white p-4 hover:bg-slate-100 focus:ring-4 focus:ring-blue-300";

    const listGroup =
      "inline-flex relative items-center py-2 px-2.5 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700";
    const buttonTypes = { primary, secondary, transparent, listGroup, outline };
    return (
      <button
        disabled={disabled}
        ref={ref}
        onClick={onClick}
        className={(variant && buttonTypes[variant]) + " " + localStyling}
      >
        {children}
      </button>
    );
  }
);

export default Button;
