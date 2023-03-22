import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./orderService";

export const applyCoupen = createAsyncThunk(
  "order/applyCoupen",
  async (thunkAPI) => {
    try {
      return await couponService.applyCoupen();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  order: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const couponSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyCoupen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(applyCoupen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
