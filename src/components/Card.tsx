import { ReactNode } from "react";
import { colour } from "../utilities/colour";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={`group p-6 max-w-[310px] my-2 ${colour.main} rounded-lg shadow-lg ${colour.hover}`}
    >
      {children}
    </div>
  );
};

export default Card;
