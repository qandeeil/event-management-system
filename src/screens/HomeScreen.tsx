"use client";
import React from "react";
import Header from "@/components/sharing/Header";
import "@/styles/screens/homeScreen.scss";
import FilterEvents from "@/components/sharing/FilterEvents";
import ViewEvents from "@/components/sharing/ViewEvents";
import { getSession, SessionProvider, signOut } from "next-auth/react";

type Props = {
  token: string | undefined;
};

const HomeScreen = ({ token }: Props) => {
  const checkSession = async () => {
    const session = await getSession();
    console.log(session);
    if (session && session.expires) {
      const expirationTime = new Date(session.expires).getTime();
      const currentTime = Date.now();
      console.log(">> currentTime: ", currentTime);
      console.log(">> expirationTime: ", expirationTime);
      if (currentTime > expirationTime) {
        signOut();
      }
    }
  };
  checkSession();
  return (
    <SessionProvider>
      <div className="home_screen">
        <Header token={token} />
        <div className="container">
          <FilterEvents />
          <ViewEvents />
        </div>
      </div>
    </SessionProvider>
  );
};

export default HomeScreen;
