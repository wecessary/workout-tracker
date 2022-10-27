import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="group p-6 max-w-[310px] my-2 bg-app-yellow-100 rounded-lg shadow-lg hover:bg-app-yellow-500">
      {children}
    </div>
  );
};

export default Card;
