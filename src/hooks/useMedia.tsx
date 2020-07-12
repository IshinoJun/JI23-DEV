import { useState, useEffect, useCallback } from "react";

const size = {
  tab: 768,
  lap: 1024,
  pc: 1200,
} as const;

const isMediaWindowSize = (key: keyof typeof size) => {
  if (typeof window !== "undefined") {
    if (window.matchMedia(`(min-width: ${size[key]}px)`).matches) {
      return true;
    }
  }

  return false;
};

const useMedia = (key: keyof typeof size) => {
  const [isMedia, setIsMedia] = useState(isMediaWindowSize(key));

  const resizeEvent = useCallback(() => {
    setIsMedia(isMediaWindowSize(key));
  }, [key]);

  useEffect(() => {
    window.addEventListener("resize", resizeEvent);

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, [resizeEvent]);

  return isMedia;
};

export default useMedia;
