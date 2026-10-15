import { Member } from "../../../lib/types/member";
import { Product } from "../../../lib/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";

const initialState: ProductsPageState = {
  seller: null,
  chosenProduct: null,
  products: [],
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,

  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    setChosenProduct: (state, action: PayloadAction<Product | null>) => {
      state.chosenProduct = action.payload;
    },

    setSeller: (state, action: PayloadAction<Member | null>) => {
      state.seller = action.payload;
    },
  },
});

export const { setProducts, setChosenProduct, setSeller } = productsPageSlice.actions;

export default productsPageSlice.reducer;
