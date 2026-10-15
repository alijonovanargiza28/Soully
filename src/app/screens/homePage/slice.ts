import { Product } from "../../../lib/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  bestSellers: [],
  newArrivals: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,

  reducers: {
    setBestSellers: (state, action: PayloadAction<Product[]>) => {
      state.bestSellers = action.payload;
    },

    setNewArrivals: (state, action: PayloadAction<Product[]>) => {
      state.newArrivals = action.payload;
    },
  },
});

export const { setBestSellers, setNewArrivals } = homePageSlice.actions;

export default homePageSlice.reducer;
