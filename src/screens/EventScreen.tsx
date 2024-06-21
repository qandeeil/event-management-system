"use client";
import Header from "@/components/sharing/Header";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import "@/styles/screens/eventScreen/eventScreen.scss";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { getEventIdThunk } from "@/store/event/event";
import Image from "next/image";
import LINK_BACKEND from "@/store/baseURL";
import { format } from "date-fns";

type Props = {};

const EventScreen = (props: Props) => {
  const [token, setToken] = useState<string>("");
  const params = useSearchParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const getSessionToken = async () => {
    const session: any = await getSession();
    setToken(session?.user.token);
  };
  const getEventHandler = async () => {
    setIsLoading(true);
    const response = await dispatch(
      getEventIdThunk({ token: token, _id: params.get("id") })
    );
    if (response) setIsLoading(false);
    if (response.payload?._id) {
      setEvent(response.payload);
    } else {
      router.push("/404");
    }
  };
  useEffect(() => {
    getSessionToken();
  }, []);
  useEffect(() => {
    if (token) {
      getEventHandler();
    }
  }, [token]);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy");
  };

  const formatTime = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return format(date, "hh:mm a");
  };

  return (
    <div className="event-screen">
      <Header token={token} />
      {isLoading ? (
        <div className="loading-content" style={{ height: "100vh" }}>
          <div className="loader"></div>
        </div>
      ) : (
        <div className="container-event">
          <div className="header-info">
            <Image
              src={LINK_BACKEND + "/" + event?.cover_photo}
              width={800}
              height={800}
              alt="cover photo"
              className="cover-photo"
            />
            <div className="info">
              <Image
                src={LINK_BACKEND + "/" + event?.preview_photo}
                width={414}
                height={622}
                alt="preview photo"
                className="preview-photo"
              />
              <div className="text-info">
                <h1>{event.title}</h1>
                <p>
                  {event.description?.length > 200
                    ? event.description.slice(0, 200) + "..."
                    : event.description}
                </p>
              </div>
            </div>
          </div>
          <div className="information-event">
            <div className="container-tow">
              <div className="header">
                <h1>{event?.title}</h1>
                <p>{event?.description}</p>
              </div>
            </div>
            <div className="container-one">
              <div className="step-one">
                <div className="header">
                  <h1>{event?.title}</h1>
                  <p>{event?.description}</p>
                </div>
                <div className="feet">
                  <div className="fe">
                    <span>location</span>
                    <span>
                      {event?.location.city}, {event?.location.country}
                    </span>
                  </div>
                  <div className="fe">
                    <span>Date</span>
                    <span>
                      {formatDate(event?.date.start_date)}{" "}
                      {`(${formatTime(event?.date.start_date)})`} -{" "}
                      {formatDate(event?.date.end_date)}{" "}
                      {`(${formatTime(event?.date.end_date)})`}
                    </span>
                  </div>
                  <div className="fe">
                    <span>Seats</span>
                    <span>
                      <label>12</label> / 50
                    </span>
                  </div>
                  <div className="fe">
                    <span>Price</span>
                    <span>$ {event.price}</span>
                  </div>
                </div>
              </div>

              <div className="step-tow">
                <h1 className="title">Organizers</h1>
                <div className="container-org">
                  {event?.organizers?.map((item: any) => (
                    <div className="container-person">
                      <Image
                        src={LINK_BACKEND + "/" + item.profile_image}
                        alt={item.name}
                        width={260}
                        height={300}
                      />
                      <div className="info-pers">
                        <span>{item.name}</span>
                        <span>Business</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventScreen;
