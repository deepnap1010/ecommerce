import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  token:"",
  role:""
};
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const registration = createAsyncThunk(
  "user/registration",
  async (user, thunkAPI) => {
    try {
      return await authService.registration(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// address
export const address = createAsyncThunk(
  "user/address",
  async (user, thunkAPI) => {
    try {
      return await authService.address(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forget_password_reset=createAsyncThunk(
  "user/forget_password_reset",
  async(data,thunkAPI)=>{
    try{
      console.log(data)
          return authService.forget_password_reset(data)
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
  }
)
export const reset_password=createAsyncThunk(
  "user/password_reset",
  async(data,thunkAPI)=>{
    try{
      
          return authService.reset_password(data)
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
  }
)


export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
        state.role=action?.payload?.role
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(registration.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Address
      .addCase(address.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(address.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(address.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        console.log(action.payload)
      }).addCase(forget_password_reset.pending,(state,action)=>{
        state.isLoading = true;
      }).addCase(forget_password_reset.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload)
        state.token= action.payload;
        state.message = "success";
      }).addCase(forget_password_reset.rejected,(state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      }).addCase(reset_password.pending,(state,action)=>{
        state.isLoading = true;
      }).addCase(reset_password.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.token= action.payload;
        state.message = "success";
      }).addCase(reset_password.rejected,(state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      
  },
});

export default authSlice.reducer;
