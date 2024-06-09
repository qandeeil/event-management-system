import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../baseURL";

interface IState {
  isLoading: boolean;
  isError: boolean;
}

const initialState: IState = {
  isLoading: false,
  isError: false,
};

export const checkValidationTokenThunk = createAsyncThunk(
  "token/checkValidationTokenThunk",
  async (token: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseURL}/user/check-validation-token-account-type`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkValidationTokenThunk.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(checkValidationTokenThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(checkValidationTokenThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default tokenSlice.reducer;
