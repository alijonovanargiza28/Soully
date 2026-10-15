import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { CartItem } from "../../../lib/types/search";
import HomeProductCard from "./HomeProductCard";
import { retriveNewArrivals } from "./selector";

export default function NewArrivals({ onAdd }: { onAdd: (item: CartItem) => void }) {
  const products = useSelector(retriveNewArrivals);
  return (
    <section
      className="new-products-frame home-flower-section"
      aria-labelledby="NewArrivals-heading"
    >
      <Container>
        <h2 className="category-title" id="NewArrivals-heading">
          New Arrivals
        </h2>
        <div className="home-flower-grid">
          {products.length ? (
            products.map((product) => (
              <HomeProductCard key={product._id} product={product} onAdd={onAdd} />
            ))
          ) : (
            <p className="no-data">New Arrivals flowers will appear here soon.</p>
          )}
        </div>
      </Container>
    </section>
  );
}
