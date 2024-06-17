import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../baseURL";

interface IFavorites {
  event_id: string;
  token: string | undefined;
}

export const actionFavoritesThunk = createAsyncThunk(
  "favorites/actionFavoritesThunk",
  async (event: IFavorites, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/favorites/add-to-favorite`,
        { event_id: event.event_id },
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

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder;
  },
});

export default favoritesSlice.reducer;
