import { useState, useEffect } from "react";

/**
 * React hook for providing current time
 *
 * The time will update precise to 1 second.
 * @returns Current time in unix epoch, milliseconds
 */
export function useTime(): number {
  const [currTime, setCurrTime] = useState(() => new Date().getTime());
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrTime(new Date().getTime());
    }, 1000);

    return () => window.clearInterval(timer);
  });

  return currTime;
}
