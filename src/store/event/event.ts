import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../baseURL";
import {
  ICreateEvent,
  IDate,
  ILocation,
} from "@/components/sharing/CreateEventDialog";

interface IRequestCreateEvent {
  data: ICreateEvent;
  token: string;
}

interface IRequestGetEvents {
  page: number;
  token: string | undefined;
  filter: {
    data: IDate;
    location: ILocation;
    expired: boolean;
  };
}

export const createEventThunk = createAsyncThunk(
  "event/createEventThunk",
  async (event: IRequestCreateEvent, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/event/create-event`,
        event.data,
        {
          headers: {
            authorization: `Bearer ${event.token}`,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const updateEventThunk = createAsyncThunk(
  "event/updateEventThunk",
  async (event: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/event/update-event`,
        event.data,
        {
          headers: {
            authorization: `Bearer ${event.token}`,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const deleteEventThunk = createAsyncThunk(
  "event/deleteEventThunk",
  async (event: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${baseURL}/event/delete-event/${event.event_id}`,
        {
          headers: {
            authorization: `Bearer ${event.token}`,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getEventsThunk = createAsyncThunk(
  "event/getEventsThunk",
  async (event: IRequestGetEvents, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/event/get-events`,
        { page: event.page, filter: event.filter },
        {
          headers: {
            authorization: `Bearer ${event.token}`,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getEventIdThunk = createAsyncThunk(
  "event/getEventIdThunk",
  async (data: { _id: string | null; token: string | undefined }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseURL}/event/get-event/${data._id}`,
        {
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const addRatingEventThunk = createAsyncThunk(
  "event/addRatingEventThunk",
  async (
    data: { event_id: string | null; token: string | undefined; rate: number },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${baseURL}/rating/add-rate`,
        { event_id: data.event_id, rate: data.rate },
        {
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const reservationEventThunk = createAsyncThunk(
  "event/reservationEventThunk",
  async (
    data: { event_id: string | null; token: string | undefined },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${baseURL}/reservation`,
        { event_id: data.event_id },
        {
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getFavoritesEvent = createAsyncThunk(
  "event/getFavoritesEvent",
  async (token: string, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/event/my-favorites`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getReservationsEvent = createAsyncThunk(
  "event/getReservationsEvent",
  async (token: string, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/event/my-reservations`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

interface IState {
  isLoading: boolean;
  isError: boolean;
}

const initialState: IState = {
  isLoading: false,
  isError: false,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder;
  },
});

export default eventSlice.reducer;
