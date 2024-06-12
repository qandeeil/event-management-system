"use client";
import "@/styles/registration/login/login.scss";
import HomeScreen from "@/screens/HomeScreen";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [shouldSignOut, setShouldSignOut] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session && session.expires) {
        const expirationTime = new Date(session.expires).getTime();
        const currentTime = Date.now();
        if (currentTime > expirationTime) {
          setShouldSignOut(true);
        }
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (shouldSignOut) {
      signOut();
    }
  }, [shouldSignOut]);
  return <HomeScreen />;
}
