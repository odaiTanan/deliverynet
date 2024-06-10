import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  initialState: [],
  name: "cartSlice",
  reducers: {
    addToCart: (state, action) => {
      //see if item is already exist
      const checkFind = state.find((item) => {
        return item.id == action.payload.id;
      });
      if (checkFind) {
        checkFind.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => {
        return item.id != action.payload;
      });
    },
    minusInCart: (state, action) => {
      const checkFind = state.find((item) => {
        return item.id == action.payload.id;
      });
      if (checkFind) {
        if (checkFind.quantity >= 2) {
          checkFind.quantity -= 1;
        }
      }
    },

    clear: (state, action) => {
      return [];
    },
  },
});

export const { addToCart, minusInCart, removeFromCart, clear } =
  cartSlice.actions;
export default cartSlice.reducer;
