import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { CartItem } from "../../../lib/types/search";
import HomeProductCard from "./HomeProductCard";
import { retriveBestSellers } from "./selector";

export default function BestSellers({ onAdd }: { onAdd: (item: CartItem) => void }) {
  const products = useSelector(retriveBestSellers);
  return (
    <section
      className="best-sellers-frame home-flower-section"
      aria-labelledby="BestSellers-heading"
    >
      <Container>
        <h2 className="category-title" id="BestSellers-heading">
          Best Sellers
        </h2>
        <div className="home-flower-grid">
          {products.length ? (
            products.map((product) => (
              <HomeProductCard key={product._id} product={product} onAdd={onAdd} />
            ))
          ) : (
            <p className="no-data">Best Sellers flowers will appear here soon.</p>
          )}
        </div>
      </Container>
    </section>
  );
}
