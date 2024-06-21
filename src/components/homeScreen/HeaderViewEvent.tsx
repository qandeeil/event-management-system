import React, { useState } from "react";
import "@/styles/screens/homeScreen/headerViewEvent.scss";

type Props = {
  expiredEvent: boolean;
  setExpiredEvent: (e: boolean) => void;
};

const HeaderViewEvent = ({ expiredEvent, setExpiredEvent }: Props) => {
  return (
    <div className="headerViewEvent">
      <div
        className={`upc ${expiredEvent === false && "active"}`}
        onClick={() => setExpiredEvent(false)}
      >
        <span>Upcoming Events</span>
      </div>
      <div
        className={`upc ${expiredEvent === true && "active"}`}
        onClick={() => setExpiredEvent(true)}
      >
        <span>Past Events</span>
      </div>
    </div>
  );
};

export default HeaderViewEvent;
