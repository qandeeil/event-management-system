"use client";
import CardEvent from "@/components/homeScreen/CardEvent";
import Header from "@/components/sharing/Header";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import "@/styles/sharing/viewEvents.scss";

type Props = {
  token: string;
  isLoading: boolean;
  events: any;
};

const MySharingScreen = ({ token, isLoading, events }: Props) => {
  return (
    <div className="myFavoritesScreen">
      <Header token={token} />
      <div className="viewEvents">
        <div className="container-card-events">
          {!isLoading && events?.length ? (
            events?.map((item: any, index: number) => (
              <CardEvent
                key={item._id}
                event={item}
                ref={index === events.length - 1 ? null : null}
                token={token}
              />
            ))
          ) : !isLoading ? (
            <span>Not found any event</span>
          ) : null}

          {isLoading ? (
            <div className="loading-content">
              <div className="loader"></div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MySharingScreen;
