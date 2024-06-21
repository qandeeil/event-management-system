"use client";
import React, { useState } from "react";
import "@/styles/sharing/filterEvents.scss";
import InputFilterEvents from "./InputFilterEvents";
import listOfCountries from "../../../public/JSON/ListOfCountries.json";
import { useRouter, useSearchParams } from "next/navigation";
import ShowDateRange from "./ShowDateRange";
import { Button } from "@mui/material";

type Props = {};

const FilterEvents = (props: Props) => {
  const params = useSearchParams();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<boolean>(false);
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
          if (selectedDate) {
            router.push(
              `?country=${v || params.get("country")}&startDate=${
                filterData.selectionRangeDate.startDate
              }&endDate=${filterData.selectionRangeDate.endDate}`
            );
          } else {
            router.push(`?country=${v || params.get("country")}`);
          }
        }}
        value={filterData.country}
      />
      <InputFilterEvents
        list={params.get("country") ? listOfCountries : []}
        title={"City"}
        country={params.get("country")?.toString()}
        route={(v: string) => {
          setFilterData((prevState) => ({
            ...prevState,
            city: v,
          }));
          if (selectedDate) {
            router.push(
              `?country=${params.get("country")}&city=${v}&startDate=${
                filterData.selectionRangeDate.startDate
              }&endDate=${filterData.selectionRangeDate.endDate}`
            );
          } else {
            router.push(`?country=${params.get("country")}&city=${v}`);
          }
        }}
        value={filterData.city}
      />
      <ShowDateRange
        onChange={(v: any) => {
          if (v.selection.startDate && v.selection.endDate) {
            router.push(
              `?country=${params.get("country") || ""}&city=${
                params.get("city") || ""
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
            setSelectedDate(true);
          }
        }}
        value={[filterData.selectionRangeDate]}
      />
      <Button
        variant="outlined"
        color="error"
        sx={{ fontWeight: "bold" }}
        onClick={() => {
          setFilterData({
            country: null,
            city: null,
            selectionRangeDate: {
              startDate: new Date(),
              endDate: new Date(),
              key: "selection",
            },
          });
          setSelectedDate(false);
          window.location.href = "/";
        }}
      >
        Reset Filter
      </Button>
    </div>
  );
};

export default FilterEvents;
