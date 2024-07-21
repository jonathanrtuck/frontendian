import { useEffect, useState } from "react";

export const useClock = (): Date => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    // first use timeout in order to get second tick interval to align with system clock
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDate(new Date());
      }, 1000);

      setDate(new Date());
    }, 1000 - new Date().getMilliseconds());

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return date;
};
