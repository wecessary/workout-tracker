import { ReactNode, useEffect, useState } from "react";

const AutoHideMessage = ({
  children,
  resetStatus,
  statuses,
}: {
  children: ReactNode;
  resetStatus: () => void;
  statuses: boolean[];
}) => {
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      resetStatus();
    }, 3000);

    return () => {
      clearTimeout(timeId);
      // The return is a clean up function.
      // React cleans up when the component unmounts and cleans up the previous effect before running the effect next time
      // With this cleanup function, it means (an example):
      // 1. if a user clicks "save data", timer1 starts. When the timer ends, isSaving and hasSaved will be set to false. This would
      // 2. cause the component to unmount.
      // 2. if a user clicks again right away, a second timer starts, the clean up function cancels timer 1 and
      // stops calling isSaving and hasSaved from being set to false three seconds from when the first timer was called
    };
  }, [...statuses]);

  return (
    <div className="flex gap-4 p-4 shadow-md rounded-md fixed bottom-16 bg-white text-slate-400">
      {children}
      <button onClick={resetStatus}>X</button>
    </div>
  );
};

export default AutoHideMessage;
