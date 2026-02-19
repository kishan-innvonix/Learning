import { combineSlices } from "@reduxjs/toolkit";
import cartSlice  from "./reducer";

// adding multiple reducer into one global reducer
export const rootReducer = combineSlices({
  cart: cartSlice,
});
