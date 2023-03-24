import { ReactNode } from "react";

export const Grid = ({
  colGap,
  children,
  alignItem,
  p,
  border,
}: {
  colGap?: string;
  children: ReactNode;
  alignItem?: string;
  p?: string;
  border?: string;
}) => {
  return (
    <div className={`grid grid-cols-12 ${colGap} ${alignItem} ${border} ${p}`}>
      {children}
    </div>
  );
};
