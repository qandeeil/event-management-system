"use client";
import React from "react";
import { signOut, useSession, getSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

type Props = {};

const page = async (props: Props) => {
  const getSessionData = await getSession();
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

export default page;
