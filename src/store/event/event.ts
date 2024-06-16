import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../baseURL";
import { ICreateEvent } from "@/components/sharing/CreateEventDialog";

interface IRequestCreateEvent {
  data: ICreateEvent;
  token: string;
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
