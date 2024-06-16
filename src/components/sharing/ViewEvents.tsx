import React, { useEffect, useRef } from "react";
import "@/styles/sharing/viewEvents.scss";
import HeaderViewEvent from "../homeScreen/HeaderViewEvent";
import CardEvent from "../homeScreen/CardEvent";
import Loading from "./Loading";

type Props = {
  events: any;
  setPage: any;
  fetchData: boolean;
  isLoading: boolean;
};

const ViewEvents = ({ events, setPage, fetchData, isLoading }: Props) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const lastElement = entries[0];
        if (lastElement.isIntersecting && fetchData) {
          setPage((prevValue: any) => prevValue + 1);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [events]);

  return (
    <div className="viewEvents">
      <HeaderViewEvent />
      <div className="container-card-events">
        {events.map((item: any, index: number) => (
          <CardEvent
            key={item._id}
            event={item}
            ref={index === events.length - 1 ? observerRef : null}
          />
        ))}

        {isLoading ? (
          <div className="loading-content">
            <div className="loader"></div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ViewEvents;
