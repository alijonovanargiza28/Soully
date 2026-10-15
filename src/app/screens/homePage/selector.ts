import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retriveBestSellers = createSelector(
  selectHomePage,
  (homePage) => homePage.bestSellers,
);

export const retriveNewArrivals = createSelector(
  selectHomePage,
  (homePage) => homePage.newArrivals,
);
