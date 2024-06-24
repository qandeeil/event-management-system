"use client";
import MySharingScreen from "@/screens/MySharingScreen";
import { getFavoritesEvent, getReservationsEvent } from "@/store/event/event";
import { useAppDispatch } from "@/store/hooks";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {};

const page = (props: Props) => {
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string>("");
  const [events, setEvents] = useState([]);
  const [isLoading, setSsLoading] = useState<boolean>(true);
  useEffect(() => {
    getSessionToken();
  }, []);

  const getSessionToken = async () => {
    const session: any = await getSession();
    setToken(session?.user.token);
  };
  const getData = async () => {
    setSsLoading(true);
    await dispatch(getReservationsEvent(token)).then((response) => {
      if (typeof response.payload?.length) {
        setEvents(response.payload);
      } else {
        setEvents([]);
      }
      setSsLoading(false);
    });
  };
  useEffect(() => {
    if (token) getData();
  }, [token]);
  return (
    <MySharingScreen token={token} events={events} isLoading={isLoading} />
  );
};

export default page;
