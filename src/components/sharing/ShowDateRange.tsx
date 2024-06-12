import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
  onChange: (e: any) => void;
  value: any;
};

const ShowDateRange = ({ onChange, value }: Props) => {
  return (
    <div className="dateRange inputFilterEvents">
      <label htmlFor="include-input-in-list">{"Date"}</label>
      <DateRange
        editableDateInputs={true}
        onChange={(item: any) => onChange(item)}
        moveRangeOnFirstSelection={false}
        ranges={value}
      />
    </div>
  );
};

export default ShowDateRange;
