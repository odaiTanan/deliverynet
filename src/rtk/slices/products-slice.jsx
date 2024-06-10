import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//fetch products api request
export const fetchedProducts = createAsyncThunk(
  "productsSlice/fetchedProducts",
  async (baseUrl) => {
    const baseUr = baseUrl;
    const res = await axios.get(`${baseUr}show/menu.php`);
    return res.data;
  }
);
const productsSlice = createSlice({
  initialState: [],
  name: "productsSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchedProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
export const {} = productsSlice.actions;
export default productsSlice.reducer;
