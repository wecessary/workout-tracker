import { ReactNode } from "react";

const CardRow = ({
  children,
  rowStyling,
}: {
  children: ReactNode;
  rowStyling?: string;
}) => {
  return <div className={`${rowStyling} flex justify-between`}>{children}</div>;
};

export default CardRow;
