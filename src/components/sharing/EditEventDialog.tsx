import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "@/styles/sharing/createEventDialog.scss";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputFilterEvents from "./InputFilterEvents";
import listOfCountries from "../../../public/JSON/ListOfCountries.json";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch } from "@/store/hooks";
import { getOrganizers } from "@/store/user/user";
import { createEventThunk, updateEventThunk } from "@/store/event/event";
import { useRouter } from "next/navigation";
import LINK_BACKEND from "@/store/baseURL";
import toast from "react-hot-toast";

export interface IEditEvent {
  _id: string;
  title: string;
  description: string;
  date: IDate;
  location: ILocation;
  seats: number;
  price: number;
  organizers: IOrganizer[];
  preview_photo: File | null;
  cover_photo: File | null;
  preview_photo_url: string;
  cover_photo_url: any;
  token: string;
}

export interface IDate {
  start_date: any;
  end_date: any;
}

export interface ILocation {
  country: any;
  city: any;
}

interface IOrganizer {
  _id: string;
  name: string;
  profile_image: string;
}

type Props = {
  openEditEventDialog: boolean;
  setOpenEditEventDialog: (v: boolean) => void;
  token: any;
  data: IEditEvent;
  getEventHandler: any;
};

const EditEventDialog = ({
  openEditEventDialog,
  setOpenEditEventDialog,
  token,
  data,
  getEventHandler,
}: Props) => {
  const [eventData, setEventData] = useState<IEditEvent>({
    _id: data?._id,
    title: data?.title,
    description: data?.description,
    date: { start_date: data?.date.start_date, end_date: data?.date.end_date },
    location: { country: data?.location.country, city: data?.location.city },
    seats: data?.seats,
    price: data?.price,
    organizers: data?.organizers,
    preview_photo: null,
    cover_photo: null,
    preview_photo_url: LINK_BACKEND + "/" + data?.preview_photo,
    cover_photo_url: LINK_BACKEND + "/" + data?.cover_photo,
    token: token,
  });

  useEffect(() => {
    if (data) {
      setEventData({
        _id: data?._id,
        title: data?.title,
        description: data?.description,
        date: {
          start_date: data?.date.start_date,
          end_date: data?.date.end_date,
        },
        location: {
          country: data?.location.country,
          city: data?.location.city,
        },
        seats: data?.seats,
        price: data?.price,
        organizers: data?.organizers,
        preview_photo: null,
        cover_photo: null,
        preview_photo_url: LINK_BACKEND + "/" + data?.preview_photo,
        cover_photo_url: LINK_BACKEND + "/" + data?.cover_photo,
        token: token,
      });
    }
  }, [data, token]);

  const [allOrganizers, setAllOrganizers] = useState<IOrganizer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDateChange = (field: keyof IDate, date: Dayjs | null) => {
    if (date) {
      const newDate = date.toDate();
      setEventData((prevState) => ({
        ...prevState,
        date: { ...prevState.date, [field]: newDate },
      }));
    }
  };

  const handleTimeChange = (field: keyof IDate, time: Dayjs | null) => {
    if (time) {
      setEventData((prevState: any) => {
        const newDate = new Date(prevState.date[field]);
        newDate.setHours(time.hour());
        newDate.setMinutes(time.minute());
        newDate.setSeconds(time.second());
        return {
          ...prevState,
          date: { ...prevState.date, [field]: newDate },
        };
      });
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "";

    const nameParts = name.split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }

    const firstInitial = nameParts[0][0].toUpperCase();
    const secondInitial = nameParts[1][0].toUpperCase();

    return firstInitial + secondInitial;
  };

  useEffect(() => {
    const getAllOrganizers = async () => {
      dispatch(getOrganizers(token)).then((res: any) =>
        setAllOrganizers(res.payload)
      );
    };
    openEditEventDialog === true && getAllOrganizers();
  }, [openEditEventDialog]);

  const validateEventData = () => {
    const { title, description, date, location, seats, price, organizers } =
      eventData;
    return (
      title?.trim() !== "" &&
      description?.trim() !== "" &&
      date?.start_date !== null &&
      date?.end_date !== null &&
      location?.country?.trim() !== "" &&
      location?.city?.trim() !== "" &&
      seats > 0 &&
      price > 0 &&
      organizers?.length > 0
    );
  };

  const editEventHandler = async () => {
    const formData: any = new FormData();
    setIsLoading(true);
    if (validateEventData()) {
      formData.append("_id", eventData._id);
      formData.append("token", eventData.token);
      formData.append("title", eventData.title);
      formData.append("description", eventData.description);
      formData.append("start_date", eventData.date.start_date);
      formData.append("end_date", eventData.date.end_date);
      formData.append("country", eventData.location.country);
      formData.append("city", eventData.location.city);
      formData.append("seats", eventData.seats);
      formData.append("price", eventData.price);
      formData.append("organizers", eventData.organizers);
      if (eventData.preview_photo)
        formData.append("preview_photo", eventData.preview_photo);
      if (eventData.cover_photo)
        formData.append("cover_photo", eventData.cover_photo);

      toast.promise(
        Promise.resolve(
          dispatch(updateEventThunk({ token: token, data: formData }))
        ).then((response) => {
          if (response.payload?.result) {
            getEventHandler(false);
            setOpenEditEventDialog(false);
            return response.payload?.message;
          }
          setIsLoading(false);
        }),
        {
          loading: "Saving...",
          success: (message) => <b>{message}</b>, // Pass message as child
          error: <b>Please try again.</b>,
        }
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={openEditEventDialog}
        onClose={() => setOpenEditEventDialog(false)}
        className="settingsDialog individual-screen"
        maxWidth="lg"
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>New Event</DialogTitle>
        <DialogContent className="dialogContent_create_event" sx={{}}>
          <div className="container_images">
            <label htmlFor="cover_photo" className="container_cover_photo">
              {eventData.cover_photo_url ? (
                <Image
                  src={eventData.cover_photo_url}
                  alt="cover photo"
                  width={300}
                  height={250}
                />
              ) : (
                <div className="container_button_upload_image">
                  <CloudUploadIcon />
                  <span>upload image</span>
                </div>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              id="cover_photo"
              style={{ display: "none" }}
              onChange={(event: any) => {
                const file = event.target.files[0];
                setEventData((prevState) => ({
                  ...prevState,
                  cover_photo_url: URL.createObjectURL(file),
                  cover_photo: file,
                }));
              }}
            />
            <label htmlFor="preview_photo" className="container_preview_photo">
              {eventData.preview_photo_url ? (
                <Image
                  src={eventData.preview_photo_url}
                  alt="cover photo"
                  width={300}
                  height={250}
                />
              ) : (
                <div className="container_button_upload_image">
                  <CloudUploadIcon />
                  <span>upload image</span>
                </div>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              id="preview_photo"
              style={{ display: "none" }}
              onChange={(event: any) => {
                const file = event.target.files[0];
                setEventData((prevState) => ({
                  ...prevState,
                  preview_photo_url: URL.createObjectURL(file),
                  preview_photo: file,
                }));
              }}
            />
          </div>
          <form>
            <h1>Event information</h1>
            <div className="container_content">
              <div className="container_title_description">
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  onChange={(e) =>
                    setEventData((prevState) => ({
                      ...prevState,
                      title: e.target.value,
                    }))
                  }
                  value={eventData.title}
                />
                <TextField
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={5}
                  onChange={(e) =>
                    setEventData((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }))
                  }
                  value={eventData.description}
                />
              </div>
              <div className="container_date_location">
                <div className="" style={{ marginTop: 10 }}>
                  <InputFilterEvents
                    list={listOfCountries}
                    title={"Location"}
                    country={null}
                    route={(v: string) => {
                      setEventData((prevState) => ({
                        ...prevState,
                        location: { country: v, city: "" },
                      }));
                    }}
                    value={eventData.location.country}
                  />
                </div>
                <InputFilterEvents
                  list={eventData.location.country ? listOfCountries : []}
                  title={"City"}
                  country={eventData.location.country}
                  route={(v: string) => {
                    setEventData((prevState) => ({
                      ...prevState,
                      location: {
                        country: eventData.location.country,
                        city: v,
                      },
                    }));
                  }}
                  value={eventData.location.city}
                />
                <Autocomplete
                  multiple
                  options={allOrganizers}
                  getOptionLabel={(option) => option.name}
                  id="organizer-autocomplete"
                  renderInput={(params) => (
                    <TextField {...params} label={"Organizers"} />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} key={option._id}>
                      {option?.profile_image.length ? (
                        <Image
                          src={option?.profile_image}
                          alt="profile_image"
                          width={40}
                          height={40}
                          style={{ borderRadius: "100%", marginRight: ".5rem" }}
                        />
                      ) : (
                        <span
                          className="profile_image_orig"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "100%",
                            marginRight: ".5rem",
                            background: "#bababa",
                            fontSize: 15,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                          }}
                        >
                          {getInitials(option?.name)}
                        </span>
                      )}
                      {option?.name}
                    </li>
                  )}
                  onChange={(event, value) =>
                    setEventData((prevData) => ({
                      ...prevData,
                      organizers: value.map((organizer: any) => organizer._id),
                    }))
                  }
                  value={eventData.organizers}
                />
              </div>
              <DatePicker
                label="Start Date"
                onChange={(date: any) => handleDateChange("start_date", date)}
              />
              <TimePicker
                label="Start Time"
                onChange={(time: any) => handleTimeChange("start_date", time)}
              />
              <DatePicker
                label="End Date"
                onChange={(date: any) => handleDateChange("end_date", date)}
              />
              <TimePicker
                label="End Time"
                onChange={(time: any) => handleTimeChange("end_date", time)}
              />
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-price">
                  Price
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-price"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Price"
                  onChange={(e) =>
                    setEventData((prevState) => ({
                      ...prevState,
                      price: Number(e.target.value),
                    }))
                  }
                  value={eventData.price}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-seats">
                  Seats
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-seats"
                  label="Seats"
                  onChange={(e) =>
                    setEventData((prevState) => ({
                      ...prevState,
                      seats: Number(e.target.value),
                    }))
                  }
                  value={eventData.seats}
                />
              </FormControl>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenEditEventDialog(false)}
            color="error"
            sx={{ fontWeight: "bold" }}
          >
            Close
          </Button>
          <Button
            onClick={editEventHandler}
            sx={{ fontWeight: "bold" }}
            disabled={!validateEventData() || isLoading}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default EditEventDialog;
