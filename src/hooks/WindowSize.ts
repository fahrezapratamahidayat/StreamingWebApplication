'use client'
import { useEffect, useState } from "react";

// Custom hook for handling window resize and calculating padding based on zoom levels
const useZoomPadding = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("wheel", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleResize);
    };
  }, []);

  const calculatePadding = () => {
    const zoomLevel = window.innerWidth / windowSize.width;

    if (zoomLevel === 1) {
      return "20px"; // Default padding
    } else if (zoomLevel === 0.9) {
      return "30px";
    } else if (zoomLevel === 0.8) {
      return "40px";
    } else if (zoomLevel === 0.75) {
      return "50px";
    } else if (zoomLevel === 0.67) {
      return "60px";
    } else if (zoomLevel === 0.5) {
      return "80px";
    } else if (zoomLevel === 0.3) {
      return "120px";
    } else if (zoomLevel === 0.25) {
      return "160px";
    } else {
      return "20px"; // Default padding for unknown zoom levels
    }
  };

  return { padding: calculatePadding() };
};

export default useZoomPadding;
