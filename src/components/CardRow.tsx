import { ReactNode } from "react";

const CardRow = ({
  children,
  rowStyling,
}: {
  children: ReactNode;
  rowStyling?: string;
}) => {
  return <div className={`${rowStyling} grid my-2`}>{children}</div>;
};

export default CardRow;
