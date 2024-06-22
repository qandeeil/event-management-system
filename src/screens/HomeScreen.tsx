"use client";
import React, { useEffect, useState, useCallback } from "react";
import Header from "@/components/sharing/Header";
import "@/styles/screens/homeScreen/homeScreen.scss";
import FilterEvents from "@/components/sharing/FilterEvents";
import ViewEvents from "@/components/sharing/ViewEvents";
import { getSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { getEventsThunk } from "@/store/event/event";
import { useSearchParams } from "next/navigation";

type Props = {};

const HomeScreen = ({}: Props) => {
  const [page, setPage] = useState<number>(1);
  const params = useSearchParams();
  const [expiredEvent, setExpiredEvent] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const [fetchData, setFetchData] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string>("");
  const getSessionToken = async () => {
    const session: any = await getSession();
    setToken(session?.user.token);
  };
  useEffect(() => {
    getSessionToken();
  }, []);

  const start_date = params.get("startDate");
  const end_date = params.get("endDate");
  const country = params.get("country");
  const city = params.get("city");

  const getEventsHandler = useCallback(
    async (expiredEventProp: boolean) => {
      setIsLoading(true);
      const response = await dispatch(
        getEventsThunk({
          page: page,
          token: token,
          filter: {
            data: {
              start_date: start_date,
              end_date: end_date,
            },
            location: {
              country: country,
              city: city,
            },
            expired: expiredEventProp,
          },
        })
      );

      if (!response.payload?.length) {
        setFetchData(false);
        setEvents([]);
      } else {
        setEvents(response.payload);
      }
      setIsLoading(false);
    },
    [token]
  );

  useEffect(() => {
    if (token) getEventsHandler(expiredEvent);
  }, [expiredEvent, token]);

  useEffect(() => {
    if ((start_date || end_date || country || city) && token) {
      window.location.reload();
    }
  }, [start_date, end_date, country, city]);

  return (
    <div className="home_screen">
      <Header token={token} />
      <div className="container">
        <FilterEvents />
        <ViewEvents
          events={events || []}
          setPage={setPage}
          fetchData={fetchData}
          isLoading={isLoading}
          token={token}
          setExpiredEvent={setExpiredEvent}
          expiredEvent={expiredEvent}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
