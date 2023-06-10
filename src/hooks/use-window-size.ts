import { useEffect, useState } from "react";

export const getWindowSize = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {width, height};
}

export const useWindowSize = () => {
  const hasWindow = typeof window !== 'undefined';
  const [windowSize, setWindowSize] = useState({width:0, height:0});

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(hasWindow ? getWindowSize() : {width:0, height:0});
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [hasWindow])

  return windowSize;
}