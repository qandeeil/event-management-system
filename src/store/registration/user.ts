import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../baseURL";
import { ILogin, ISignup } from "@/components/registration/signup/Interfaces";

const initialState: any = {
  isError: null,
};

export const accountTypeThunk = createAsyncThunk(
  "user/accountTypeThunk",
  async (type: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseURL}/user/access-create-account?account_type=${type}`
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

export const createAccountThunk = createAsyncThunk(
  "user/createAccountThunk",
  async (data: ISignup, thunkAPI) => {
    try {
      const response = await axios.post(`${baseURL}/user/new-user`, data, {
        headers: {
          authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

export const loginThunk = createAsyncThunk(
  "user/loginThunk",
  async (data: ILogin, thunkAPI) => {
    try {
      const response = await axios.post(`${baseURL}/user/login`, data, {});
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsErrorSignup: (state, action) => {
      state.isError = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createAccountThunk.rejected, (state, action) => {
      state.isError = action.payload;
    });
  },
});

export const { setIsErrorSignup } = userSlice.actions;
export default userSlice.reducer;
