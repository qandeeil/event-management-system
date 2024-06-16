import React, { useState } from "react";
import "@/styles/screens/homeScreen/headerViewEvent.scss";

type Props = {};

const HeaderViewEvent = (props: Props) => {
  const [filterEvent, setFilterEvent] = useState<Number>(0);
  return (
    <div className="headerViewEvent">
      <div
        className={`upc ${filterEvent === 0 && "active"}`}
        onClick={() => setFilterEvent(0)}
      >
        <span>Upcoming Events</span>
      </div>
      <div
        className={`upc ${filterEvent === 1 && "active"}`}
        onClick={() => setFilterEvent(1)}
      >
        <span>Past Events</span>
      </div>
    </div>
  );
};

export default HeaderViewEvent;
