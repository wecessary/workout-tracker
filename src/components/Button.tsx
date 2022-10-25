import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  ReactNode,
} from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "transparent";
}

const Button = forwardRef(
  (
    { children, onClick, variant }: ButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    const primary =
      "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
    const secondary =
      "text-white bg-slate-400 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

    const transparent =
      "text-sm shadow-md rounded-md bg-white p-4 hover:bg-slate-100 focus:ring-4 focus:ring-blue-300";

    const buttonTypes = { primary, secondary, transparent };
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={variant && buttonTypes[variant]}
      >
        {children}
      </button>
    );
  }
);

export default Button;
