import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
//sign in or up
export const addUser = createAsyncThunk(
  "userSlice/addUser",
  async ({ formData, baseUrl, InOrUp }, { rejectWithValue }) => {
    try {
      const cookie = new Cookies();
      cookie.remove("token");
      cookie.remove("rule");
      let res = "";
      res = await axios.post(`${baseUrl}auth/sign${InOrUp}.php`, formData);
      const result = await res.data;
      return result;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
//refresh user authantication
export const refresh = createAsyncThunk(
  "userSlice/addUser",
  async ({ baseUrl, token }, { rejectWithValue }) => {
    try {
      const cookie = new Cookies();
      if (!token) {
        token = await cookie.get("token");
      }
      await cookie.remove("token");
      await cookie.remove("rule");
      let res = "";
      const formData = new FormData();
      formData.append("token", token);
      res = await axios.post(`${baseUrl}refresh.php`, formData);
      const result = await res.data;

      return result;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const userSlice = createSlice({
  initialState: { user: null, loading: false, error: null },
  name: "userSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addUser.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      const token = action.payload.token;
      const rule = action.payload.rule;
      const cookie = new Cookies();
      cookie.set("token", token);
      cookie.set("rule", rule);
      return { error: false, loading: false, user: action.payload };
    });
    builder.addCase(addUser.rejected, (state, action) => {
      return { ...state, error: true, loading: false };
    });
  },
  extraReducers: (builder) => {
    builder.addCase(refresh.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      const token = action.payload.token;
      const rule = action.payload.rule;
      const cookie = new Cookies();

      cookie.set("token", token);
      cookie.set("rule", rule);
      return { error: false, loading: false, user: action.payload };
    });
    builder.addCase(refresh.rejected, (state, action) => {
      return { ...state, loading: false, error: true };
    });
  },
});
export const {} = userSlice.actions;
export default userSlice.reducer;
