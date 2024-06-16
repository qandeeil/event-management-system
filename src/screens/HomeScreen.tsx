"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Header from "@/components/sharing/Header";
import "@/styles/screens/homeScreen/homeScreen.scss";
import FilterEvents from "@/components/sharing/FilterEvents";
import ViewEvents from "@/components/sharing/ViewEvents";
import { getSession, SessionProvider, signOut } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { getEventsThunk } from "@/store/event/event";

type Props = {
  token: string | undefined;
};

const HomeScreen = ({ token }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [events, setEvents] = useState<any[]>([]);
  const [fetchData, setFetchData] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // const checkSession = useCallback(async () => {
  //   const session = await getSession();
  //   if (session && session.expires) {
  //     const expirationTime = new Date(session.expires).getTime();
  //     const currentTime = Date.now();
  //     if (currentTime > expirationTime) {
  //       signOut();
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   checkSession();
  // }, [checkSession]);

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
  }, [page]);

  useEffect(() => {
    fetchData && !isLoading && getEventsHandler();
  }, [page]);

  return (
    <SessionProvider>
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
    </SessionProvider>
  );
};

export default HomeScreen;
