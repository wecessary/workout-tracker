import { MutableRefObject, useEffect, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { XCircle, ThreeDots } from "./Icons";

const DeleteSetBtn = ({ handleDeleteSet }: { handleDeleteSet: () => void }) => {
  const [isDeleteState, setIsDeleteState] = useState(false);
  const ref = useOutsideClick(() => setIsDeleteState(false));

  function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsDeleteState((prev) => {
      prev && handleDeleteSet();
      return !prev;
    });
  }

  useEffect(() => {
    if (isDeleteState) {
      const timer = setTimeout(() => {
        setIsDeleteState(false);
      }, 3500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isDeleteState]);

  return (
    <>
      <button
        ref={ref as MutableRefObject<HTMLButtonElement>}
        onClick={handleOnClick}
        className="text-white"
      >
        {isDeleteState ? <XCircle /> : <ThreeDots />}
      </button>
    </>
  );
};

export default DeleteSetBtn;
