import { ReactNode, useEffect, useState } from "react";

const NotificationChip = ({
  children,
  clearStatus,
}: {
  children: ReactNode;
  clearStatus: () => void;
}) => {
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      clearStatus();
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <div className="flex gap-4 p-4 shadow-md rounded-md">
      {children}
      <button onClick={clearStatus}>X</button>
    </div>
  );
};

export default NotificationChip;
