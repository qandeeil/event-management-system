import React, { forwardRef, useState } from "react";
import "@/styles/screens/homeScreen/cardEvent.scss";
import Image from "next/image";
import bookmarkSVG from "../../../public/icon/bookmark.svg";
import bookmarkActiveSVG from "../../../public/icon/bookmarkActive.svg";
import calendarSVG from "../../../public/icon/calendar.svg";
import locationSVG from "../../../public/icon/location.svg";
import LINK_BACKEND from "@/store/baseURL";
import { useAppDispatch } from "@/store/hooks";
import { actionFavoritesThunk } from "@/store/favorites/favorites";
import toast from "react-hot-toast";

type Props = {
  event: any;
  token: string;
};

const CardEvent = forwardRef<HTMLDivElement, Props>(({ event, token }, ref) => {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState<boolean>(event?.isFavorite);
  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const options: any = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options).replace(/ /g, " ");
  }
  const rating = event?.rating || 0;
  const maxRating = 5;
  const percentage = (rating / maxRating) * 100;
  const bookedSeats = event?.bookedSeats || 0;
  const totalSeats = event?.seats || 0;
  const seatsPercentage = totalSeats ? (bookedSeats / totalSeats) * 100 : 0;

  const actionFavorites = async (_id: string) => {
    toast.promise(
      Promise.resolve(
        dispatch(actionFavoritesThunk({ event_id: _id, token: token }))
      ).then((response) => {
        if (response.payload?.result) {
          setIsFavorite(!isFavorite);
          return response.payload?.message;
        }
      }),
      {
        loading: "Saving...",
        success: (message) => <b>{message}</b>, // Pass message as child
        error: <b>Please try again.</b>,
      }
    );
  };

  return (
    <div className="card-event" ref={ref}>
      <div className="container-image">
        <div className="image">
          <Image
            src={LINK_BACKEND + "/" + event?.cover_photo}
            alt="image"
            width={200}
            height={200}
          />
        </div>
        <div className="container-top">
          <div className="price">
            <span>$ {event?.price}</span>
          </div>
          <div className="save" onClick={() => actionFavorites(event?._id)}>
            <Image
              src={isFavorite ? bookmarkActiveSVG : bookmarkSVG}
              alt="bookmark"
              width={50}
              height={50}
            />
          </div>
        </div>
        <div className="container-bottom">
          <div className="paid">
            <span>Paid</span>
          </div>
          {event?.expired && (
            <div className="expired">
              <span>Expired</span>
            </div>
          )}
        </div>
      </div>
      <div className="info-event">
        <div className="by">
          <span>By</span>
          <div className="info-created">
            <Image
              src={LINK_BACKEND + "/" + event?.creator?.profile_image}
              alt="image"
              width={25}
              height={25}
            />
            <span>{event?.creator?.name}</span>
          </div>
        </div>
        <h1 className="title">{event?.title}</h1>
        <div className="date">
          <Image src={calendarSVG} alt="calendar" width={23} height={23} />
          <div className="from da">
            <span>From</span>
            <span>{formatDate(event?.date?.start_date)}</span>
          </div>
          <div className="to da">
            <span>To</span>
            <span>{formatDate(event?.date?.end_date)}</span>
          </div>
        </div>
        <div className="location date">
          <Image src={locationSVG} alt="location" width={23} height={23} />
          <div className="from da">
            <span>Location</span>
            <span>
              {event?.location?.city}, {event?.location?.country}
            </span>
          </div>
        </div>
      </div>
      <div className="extra-info-event">
        <div className="ex">
          <div className="rating">
            <span>Rating</span>
            <span>{percentage}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
        <div className="ex">
          <div className="rating">
            <span>Upcoming</span>
            <span>
              {bookedSeats}/{totalSeats}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${seatsPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CardEvent;
