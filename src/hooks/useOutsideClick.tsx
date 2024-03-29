import { MutableRefObject, useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void) => {
  const ref: MutableRefObject<
    null | HTMLDivElement | HTMLInputElement | HTMLTextAreaElement
  > = useRef(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [ref]);

  return ref;
};

export default useOutsideClick;
