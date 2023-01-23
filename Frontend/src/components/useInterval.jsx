import { useEffect } from "react";
import { useRef } from "react";

function useInterval(callback, delay) {
  const savedCallBack = useRef();

  useEffect(() => {
    savedCallBack.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallBack.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
