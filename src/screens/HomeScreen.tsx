"use client";
import React from "react";
import { signOut, useSession, getSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/sharing/Header";
import "@/styles/screens/homeScreen.scss";
import { getServerSession } from "next-auth";
import FilterEvents from "@/components/sharing/FilterEvents";
import ViewEvents from "@/components/sharing/ViewEvents";

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <div className="home_screen">
      <Header />
      <div className="container">
        <FilterEvents />
        <ViewEvents />
      </div>
    </div>
  );
};

export default HomeScreen;
