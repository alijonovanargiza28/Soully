import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import OrdersPageReducer from "./screens/ordersPage/slice";
import ProductPageReducer from "./screens/productsPage/slice";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductPageReducer,
    ordersPage: OrdersPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
