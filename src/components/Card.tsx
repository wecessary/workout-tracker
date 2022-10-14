import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="group p-6 max-w-[310px] my-2 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
      {children}
    </div>
  );
};

export default Card;
