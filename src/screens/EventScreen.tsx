"use client";
import Header from "@/components/sharing/Header";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import "@/styles/screens/eventScreen/eventScreen.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import {
  addRatingEventThunk,
  deleteEventThunk,
  getEventIdThunk,
  reservationEventThunk,
} from "@/store/event/event";
import Image from "next/image";
import LINK_BACKEND from "@/store/baseURL";
import { format } from "date-fns";
import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import toast from "react-hot-toast";
import EditEventDialog from "@/components/sharing/EditEventDialog";

type Props = {};

const EventScreen = (props: Props) => {
  const [token, setToken] = useState<string>("");
  const params = useSearchParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>();
  const [ratingEvent, setRatingEvent] = useState(event?.rating);
  const [rating, setRating] = useState(event?.ratingUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openEditEventDialog, setOpenEditEventDialog] =
    React.useState<boolean>(false);
  const [openDeleteEventDialog, setOpenDeleteEventDialog] =
    React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    getSessionToken();
  }, []);

  const getSessionToken = async () => {
    const session: any = await getSession();
    setToken(session?.user.token);
  };
  const getEventHandler = async (loading: boolean) => {
    setIsLoading(loading);
    const response = await dispatch(
      getEventIdThunk({ token: token, _id: params.get("id") })
    );
    if (response) setIsLoading(false);
    if (response.payload?._id) {
      setEvent(response.payload);
      setRatingEvent(response.payload.rating);
      setRating(response.payload.ratingUser);
    } else {
      router.push("/404");
    }
  };

  useEffect(() => {
    if (token) {
      getEventHandler(true);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getEventHandler(false);
    }
  }, [rating]);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy");
  };

  const formatTime = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return format(date, "hh:mm a");
  };

  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#545454bf",
  };

  const calculateProgressWidth = (count: any, total: any) => {
    if (total === 0) return "0%";
    return `${(count / total) * 100}%`;
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
                <h1>Creator</h1>
                <div className="creator">
                  <Image
                    src={LINK_BACKEND + "/" + event?.creator.profile_image}
                    alt={event?.creator.name}
                    width={100}
                    height={100}
                  />
                  <div className="info-acc">
                    <span>{event?.creator.name}</span>
                    <span>{event?.creator.account_type}</span>
                  </div>
                </div>
              </div>

              <div className="header he2">
                <h1>Rate this event</h1>
                <Rating
                  style={{ maxWidth: 200 }}
                  value={rating}
                  onChange={async (e: number) => {
                    setRating(e);
                    toast.promise(
                      Promise.resolve(
                        dispatch(
                          addRatingEventThunk({
                            token,
                            event_id: event?._id,
                            rate: e,
                          })
                        )
                      ).then((response) => {
                        if (response.payload?.result) {
                          return response.payload?.message;
                        }
                      }),
                      {
                        loading: "Saving...",
                        success: (message) => <b>{message}</b>, // Pass message as child
                        error: <b>Please try again.</b>,
                      }
                    );
                  }}
                  itemStyles={myStyles}
                />
              </div>

              <div className="header he2">
                {!event?.event_origin && (
                  <Button
                    variant="contained"
                    color={event?.booked ? "error" : "success"}
                    sx={{ height: 50, fontWeight: "bold" }}
                    disabled={event?.expired}
                    onClick={() => {
                      toast.promise(
                        Promise.resolve(
                          dispatch(
                            reservationEventThunk({
                              token,
                              event_id: event?._id,
                            })
                          )
                        ).then((response) => {
                          getEventHandler(false);
                          if (response.payload?.result) {
                            return response.payload?.message;
                          } else {
                            throw new Error(
                              response.payload?.message || "An error occurred"
                            );
                          }
                        }),
                        {
                          loading: "Saving...",
                          success: (message) => <b>{message}</b>,
                          error: (error) => (
                            <b>{error.message || "Please try again."}</b>
                          ),
                        }
                      );
                    }}
                  >
                    {event?.booked ? "Cancel reservation" : "Reservation"}{" "}
                    {event?.expired && "(Expired)"}
                  </Button>
                )}

                {event?.event_origin && (
                  <>
                    <Button
                      variant="contained"
                      color="info"
                      sx={{ height: 50, fontWeight: "bold" }}
                      disabled={event?.expired}
                      onClick={() => setOpenEditEventDialog(true)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ height: 50, fontWeight: "bold" }}
                      onClick={() => setOpenDeleteEventDialog(true)}
                    >
                      Delete
                    </Button>
                  </>
                )}
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
                      <label>{event?.numberBooked}</label> / {event?.seats}
                    </span>
                  </div>
                  <div className="fe">
                    <span>Price</span>
                    <span>$ {event.price}</span>
                  </div>
                </div>
              </div>

              <div className="step-tow con2">
                <h1 className="title">Ratings</h1>
                <div className="container-org">
                  <div className="section-one">
                    <h1>{event?.rating}</h1>
                    <Rating
                      style={{ maxWidth: 140 }}
                      value={ratingEvent}
                      onChange={setRatingEvent}
                      itemStyles={myStyles}
                      readOnly
                    />
                    <span>{event?.number_of_reviews}</span>
                  </div>
                  <div className="section-one section-two">
                    <div className="container-progress">
                      <span>5</span>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: calculateProgressWidth(
                              event?.categories_of_evaluations.five,
                              event?.number_of_reviews
                            ),
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="container-progress">
                      <span>4</span>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: calculateProgressWidth(
                              event?.categories_of_evaluations.four,
                              event?.number_of_reviews
                            ),
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="container-progress">
                      <span>3</span>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: calculateProgressWidth(
                              event?.categories_of_evaluations.three,
                              event?.number_of_reviews
                            ),
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="container-progress">
                      <span>2</span>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: calculateProgressWidth(
                              event?.categories_of_evaluations.two,
                              event?.number_of_reviews
                            ),
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="container-progress">
                      <span>1</span>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: calculateProgressWidth(
                              event?.categories_of_evaluations.one,
                              event?.number_of_reviews
                            ),
                          }}
                        ></div>
                      </div>
                    </div>
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
      <EditEventDialog
        openEditEventDialog={openEditEventDialog}
        setOpenEditEventDialog={setOpenEditEventDialog}
        token={token}
        data={event}
        getEventHandler={getEventHandler}
      />
      <Dialog
        open={openDeleteEventDialog}
        onClose={() => setOpenDeleteEventDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Event"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteEventDialog(false)}>
            Disagree
          </Button>
          <Button
            onClick={() => {
              toast.promise(
                Promise.resolve(
                  dispatch(
                    deleteEventThunk({
                      token,
                      event_id: event?._id,
                    })
                  )
                ).then((response) => {
                  if (response.payload?.result) {
                    router.push("/");
                    return response.payload?.message;
                  }
                }),
                {
                  loading: "Saving...",
                  success: (message) => <b>{message}</b>,
                  error: <b>Please try again.</b>,
                }
              );
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventScreen;
