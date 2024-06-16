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

interface ICreateEvent {
  title: string;
  description: string;
  date: IDate;
  location: ILocation;
  seats: Number;
  price: Number;
  organizers: IOrganizer[];
  preview_photo: File | null;
  cover_photo: File | null;
  preview_photo_url: string;
  cover_photo_url: any;
}

interface IDate {
  start_date: Date | null;
  end_date: Date | null;
}

interface ILocation {
  country: string;
  city: string;
}

interface IOrganizer {
  _id: string;
  name: string;
  profile_image: string;
}

type Props = {
  openCreateEventDialog: boolean;
  setOpenCreateEventDialog: (v: boolean) => void;
  token: any;
};

const CreateEventDialog = ({
  openCreateEventDialog,
  setOpenCreateEventDialog,
  token,
}: Props) => {
  const [eventData, setEventData] = useState<ICreateEvent>({
    title: "",
    description: "",
    date: { start_date: null, end_date: null },
    location: { country: "", city: "" },
    seats: 0,
    price: 0,
    organizers: [],
    preview_photo: null,
    cover_photo: null,
    preview_photo_url: "",
    cover_photo_url: "",
  });

  const [allOrganizers, setAllOrganizers] = useState<IOrganizer[]>([]);
  const dispatch = useAppDispatch();

  const handleDateChange = (field: keyof IDate, date: Dayjs | null) => {
    if (date) {
      const newDate = date.toDate();
      console.log(">> newDate: ", newDate);
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
    openCreateEventDialog === true && getAllOrganizers();
  }, [openCreateEventDialog]);

  console.log(">> eventData: ", eventData);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={openCreateEventDialog}
        onClose={() => setOpenCreateEventDialog(false)}
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
                  title={"Cety"}
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
                      {option?.profile_image ? (
                        <Image
                          src={option?.profile_image}
                          alt="profile_image"
                          width={40}
                          height={40}
                          style={{ borderRadius: "100%", marginRight: ".5rem" }}
                        />
                      ) : (
                        getInitials(option?.name)
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
                />
              </FormControl>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenCreateEventDialog(false)}
            color="error"
            sx={{ fontWeight: "bold" }}
          >
            Close
          </Button>
          <Button onClick={() => {}} sx={{ fontWeight: "bold" }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default CreateEventDialog;
