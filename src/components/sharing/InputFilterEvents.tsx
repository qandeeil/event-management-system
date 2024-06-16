"use client";
import React, { useState, useEffect } from "react";
import "@/styles/sharing/inputFilterEvents.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

type Props = {
  list: any;
  title: string;
  country: string | null | undefined;
  route: any;
  value: any;
};

const getUniqueCountries: any = (list: any) => {
  const countries = list.map((option: { Country: string }) => option.Country);
  return Array.from(new Set(countries));
};

const getCitiesByCountry: any = (list: any, country: string) => {
  const cities = list
    .filter((option: { Country: string }) => option.Country === country)
    .map((option: { City: string }) => option.City);
  return Array.from(new Set(cities));
};

const InputFilterEvents = ({ list, title, country, route, value }: Props) => {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (country) {
      setOptions(getCitiesByCountry(list, country));
    } else {
      setOptions(getUniqueCountries(list));
    }
  }, [country, list]);

  return (
    <div className="inputFilterEvents">
      <Autocomplete
        options={options}
        id={`include-input-in-list-${title}`}
        renderInput={(params) => (
          <TextField
            {...params}
            label={title}
          />
        )}
        onChange={(e, v) => route(v)}
        value={value}
      />
    </div>
  );
};

export default InputFilterEvents;
