import { CartItem } from "../../../lib/types/search";
import { useEffect } from "react";
import Advertisement from "./Advertisement";
import Events from "./Events";
import Statistics from "./Statistics";

import { useDispatch } from "react-redux";

import { setBestSellers, setNewArrivals } from "./slice";

import ProductService from "../../services/ProductService";

import "../../../css/home.css";

import BestSellers from "./BestSellers";
import NewArrivals from "./NewArrivals";

// REDUX DISPATCH

export default function HomePage({ onAdd }: { onAdd: (item: CartItem) => void }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const product = new ProductService();

    // BEST SELLERS
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
      })
      .then((data) => {
        dispatch(setBestSellers(data));
      })
      .catch((err) => console.error(err));

    // NEW ARRIVALS
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => {
        dispatch(setNewArrivals(data));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  return (
    <div className="homepage">
      <Statistics />
      <Advertisement />

      <BestSellers onAdd={onAdd} />

      <NewArrivals onAdd={onAdd} />

      <Events />
    </div>
  );
}
