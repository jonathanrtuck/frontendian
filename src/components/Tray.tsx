import { FunctionComponent, useState } from "react";

import { Calendar, Clock } from "@/components";
import { Network } from "@/icons";

export const Tray: FunctionComponent = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  return (
    <aside className="tray">
      <ul className="tray__icons">
        <li className="tray__icon">
          <Network />
        </li>
      </ul>
      <Clock
        onClick={() => {
          setIsCalendarOpen(true);
        }}
      />
      {Boolean(isCalendarOpen) && (
        <Calendar
          onClose={() => {
            setIsCalendarOpen(false);
          }}
        />
      )}
    </aside>
  );
};

Tray.displayName = "Tray";
