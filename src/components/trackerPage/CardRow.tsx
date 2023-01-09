import { ReactNode } from "react";

const CardRow = ({
  children,
  rowStyling,
}: {
  children: ReactNode;
  rowStyling?: string;
}) => {
  return <div className={`${rowStyling} my-2`}>{children}</div>;
};

export default CardRow;
