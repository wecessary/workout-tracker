import { ComponentPropsWithoutRef, ReactNode } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant: "primary" | "secondary";
}

const Button = ({ children, onClick, variant }: ButtonProps) => {
  const primary =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
  const secondary =
    "text-white bg-slate-400 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

  const buttonTypes = { primary, secondary };
  return (
    <button onClick={onClick} className={buttonTypes[variant]}>
      {children}
    </button>
  );
};

export default Button;
