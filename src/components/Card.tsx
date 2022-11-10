import { ReactNode } from "react";
import { colour } from "../utilities/colour";

const Card = ({ children }: { children: ReactNode }) => {
  //max-w-[310px]
  return (
    <div
      className={`group p-3 w-[90vw] md:w-[30vw] my-2 ${colour.main} rounded-lg shadow-lg ${colour.hover}`}
    >
      {children}
    </div>
  );
};

export default Card;
