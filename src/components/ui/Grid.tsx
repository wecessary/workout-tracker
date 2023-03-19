import { ReactNode } from "react";
import { AlignItem, Border, Gap, P } from "../../model/classNames";

export const Grid = ({
  colGap,
  children,
  alignItem,
  p,
  border,
}: {
  colGap?: Gap;
  children: ReactNode;
  alignItem?: AlignItem;
  p?: P;
  border?: Border;
}) => {
  return (
    <div className={`grid grid-cols-12 ${colGap} ${alignItem} ${border} ${p}`}>
      {children}
    </div>
  );
};

