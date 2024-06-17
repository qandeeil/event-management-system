"use client";
import React, { useEffect, useState, useCallback } from "react";
import Header from "@/components/sharing/Header";
import "@/styles/screens/homeScreen/homeScreen.scss";
import FilterEvents from "@/components/sharing/FilterEvents";
import ViewEvents from "@/components/sharing/ViewEvents";
import { getSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { getEventsThunk } from "@/store/event/event";

type Props = {};

const HomeScreen = ({}: Props) => {
  const [page, setPage] = useState<number>(1);
  const [events, setEvents] = useState<any[]>([]);
  const [fetchData, setFetchData] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string>("");
  const getSessionToken = async () => {
    const session: any = await getSession();
    setToken(session?.user.token);
  };
  useEffect(() => {
    getSessionToken();
  }, []);

  const getEventsHandler = useCallback(async () => {
    setIsLoading(true);
    const response = await dispatch(
      getEventsThunk({ page: page, token: token })
    );
    if (response) {
      if (response.payload?.length) {
        setEvents((prevEvents) => [...prevEvents, ...response.payload]);
      } else {
        setFetchData(false);
      }
      setIsLoading(false);
    }
  }, [page, token]);

  useEffect(() => {
    token && fetchData && !isLoading && getEventsHandler();
  }, [page, token]);

  return (
    <div className="home_screen">
      <Header token={token} />
      <div className="container">
        <FilterEvents />
        <ViewEvents
          events={events}
          setPage={setPage}
          fetchData={fetchData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
