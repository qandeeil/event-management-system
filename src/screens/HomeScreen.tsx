"use client";
import React from "react";
import { signOut, useSession, getSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
      >
        logout
      </button>
    </div>
  );
};

export default HomeScreen;
