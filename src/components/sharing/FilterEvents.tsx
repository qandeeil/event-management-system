"use client";
import React, { useState } from "react";
import "@/styles/sharing/filterEvents.scss";
import InputFilterEvents from "./InputFilterEvents";
import listOfCountries from "../../../public/JSON/ListOfCountries.json";
import { useRouter, useSearchParams } from "next/navigation";
import ShowDateRange from "./ShowDateRange";

type Props = {};

const FilterEvents = (props: Props) => {
  const params = useSearchParams();
  const router = useRouter();
  const [filterData, setFilterData] = useState({
    country: params.get("country"),
    city: params.get("city"),
    selectionRangeDate: {
      startDate: params.get("startDate")?.length
        ? params.get("startDate")
        : new Date(),
      endDate: params.get("endDate")?.length
        ? params.get("endDate")
        : new Date(),
      key: "selection",
    },
  });
  return (
    <div className="filterEvents">
      <h1 className="title">Filter Events</h1>
      <InputFilterEvents
        list={listOfCountries}
        title={"Location"}
        country={null}
        route={(v: string) => {
          setFilterData((prevState) => ({
            ...prevState,
            country: v,
          }));
          router.push(
            `?country=${v || params.get("country")}&startDate=${
              filterData.selectionRangeDate.startDate
            }&endDate=${filterData.selectionRangeDate.endDate}`
          );
        }}
        value={filterData.country}
      />
      <InputFilterEvents
        list={listOfCountries}
        title={"Cety"}
        country={params.get("country")?.toString()}
        route={(v: string) => {
          setFilterData((prevState) => ({
            ...prevState,
            city: v,
          }));
          router.push(
            `?country=${params.get("country")}&city=${v}&startDate=${
              filterData.selectionRangeDate.startDate
            }&endDate=${filterData.selectionRangeDate.endDate}`
          );
        }}
        value={filterData.city}
      />
      <ShowDateRange
        onChange={(v: any) => {
          if (v.selection.startDate && v.selection.endDate) {
            router.push(
              `?country=${params.get("country") || "all"}&city=${
                params.get("city") || "all"
              }&startDate=${v.selection.startDate}&endDate=${
                v.selection.endDate
              }`
            );
            setFilterData((prevState) => ({
              ...prevState,
              selectionRangeDate: {
                startDate: v.selection.startDate,
                endDate: v.selection.endDate,
                key: "selection",
              },
            }));
          }
        }}
        value={[filterData.selectionRangeDate]}
      />
    </div>
  );
};

export default FilterEvents;
