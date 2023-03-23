import { animated, useSpring } from "@react-spring/web";
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "transparent" | "listGroup" | "outline";
  localStyling?: string;
  ariaLabel?: string;
}

const Button = forwardRef(
  (
    {
      children,
      onClick,
      variant,
      localStyling,
      disabled,
      ariaLabel,
    }: ButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    const primary =
      "text-black bg-[#F4F4F4] hover:bg-[#C8C8C8] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2";
    const secondary =
      "text-white bg-slate-400 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2";

    const outline = `disabled:opacity-50 text-white bg-transparent border border-white font-medium rounded-lg text-sm px-5 py-2.5`;

    const transparent =
      "text-sm shadow-md rounded-md bg-white p-4 hover:bg-slate-100 focus:ring-4 focus:ring-blue-300";

    const listGroup =
      " text-black inline-flex relative items-center py-2 px-2.5 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700";
    const buttonTypes = { primary, secondary, transparent, listGroup, outline };
    return (
      <button
        disabled={disabled}
        ref={ref}
        onClick={onClick}
        className={(variant && buttonTypes[variant]) + " " + localStyling}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

interface AuthRouterLinkProps {
  logo: JSX.Element;
  text: string;
  to: string;
}

export const AuthRouterLink = ({ logo, text, to }: AuthRouterLinkProps) => {
  return (
    <Link className="auth-btn" to={to}>
      {logo}
      <span className="text-gray-300">{text}</span>
    </Link>
  );
};

interface AuthButtonProps extends ComponentPropsWithoutRef<"button"> {
  logo: JSX.Element;
  text: string;
  callback: () => Promise<void>;
}

export const AuthButton = ({ logo, text, callback }: AuthButtonProps) => {
  const [spring, api] = useSpring(() => ({
    from: { y: 0 },
  }));

  async function handleClick() {
    api.start({ y: 10 });
    await callback();
  }
  function handleClickFinishes() {
    api.start({ y: 0 });
  }

  return (
    <animated.button
      style={{ ...spring }}
      className="auth-btn"
      onMouseDown={handleClick}
      onMouseUp={handleClickFinishes}
      onTouchStart={handleClick}
      onTouchEnd={handleClickFinishes}
    >
      {logo}
      <span className="text-gray-300">{text}</span>
    </animated.button>
  );
};
