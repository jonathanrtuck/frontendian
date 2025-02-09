"use client";

import { useEffect, useState } from "react";

export const useClock = (): Date => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    let animationFrameRequest: ReturnType<typeof requestAnimationFrame>;

    // @recursive
    const tick = () => {
      // only update state every second
      setDate((prevState) => {
        const now = new Date();

        return now.getSeconds() !== prevState.getSeconds() ? now : prevState;
      });

      animationFrameRequest = requestAnimationFrame(tick);
    };

    animationFrameRequest = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameRequest);
    };
  }, []);

  return date;
};
