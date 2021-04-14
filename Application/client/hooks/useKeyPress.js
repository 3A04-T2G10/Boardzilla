import { useEffect } from "react";

export default function useKeyPress(key, callback, active = true) {
  useEffect(() => {
    const keypress = (event) => {
      if (event.key === key) {
        callback();
      }
    };

    if (active) {
      window.addEventListener("keypress", keypress);
    }

    return () => {
      if (active) {
        window.removeEventListener("keypress", keypress);
      }
    };
  }, [callback, active]);
}
