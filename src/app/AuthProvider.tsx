"use client";
import { getSession, SessionProvider, signOut } from "next-auth/react";
import React, { useCallback, useEffect, useState, Suspense } from "react";

const SessionChecker = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  const checkSession = useCallback(async () => {
    const session = await getSession();
    if (session && session.expires) {
      const expirationTime = new Date(session.expires).getTime();
      const currentTime = Date.now();
      if (currentTime > expirationTime) {
        signOut();
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (loading) {
    return (
      <div className="loading-content" style={{ height: "100vh" }}>
        <div className="loader"></div>
      </div>
    );
  }

  return <>{children}</>;
};

type Props = { children: React.ReactNode };

const AuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Suspense
        fallback={
          <div className="loading-content" style={{ height: "100vh" }}>
            <div className="loader"></div>
          </div>
        }
      >
        <SessionChecker>{children}</SessionChecker>
      </Suspense>
    </SessionProvider>
  );
};

export default AuthProvider;
