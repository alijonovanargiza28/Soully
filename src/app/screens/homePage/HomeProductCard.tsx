import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mediaUrl } from "../../../lib/media";
import { Product } from "../../../lib/types/product";
import { CartItem } from "../../../lib/types/search";

export interface HomeProductCardProps {
  product: Product;
  onAdd: (item: CartItem) => void;
}

export default function HomeProductCard({ product, onAdd }: HomeProductCardProps) {
  const [added, setAdded] = useState(false);
  const available = product.productLeftCount > 0;
  const image = mediaUrl(product.productImages[0]);
  const detailUrl = `/products/${product._id}`;

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1400);
    return () => window.clearTimeout(timer);
  }, [added]);

  const addToCart = () => {
    if (!available) return;
    onAdd({
      _id: product._id,
      name: product.productName,
      price: product.productPrice,
      image,
      quantity: 1,
    });
    setAdded(true);
  };

  return (
    <article className="home-flower-card">
      <div className="home-flower-card__photo">
        <Link to={detailUrl} aria-label={`View ${product.productName}`}>
          <img src={image} alt={product.productName} loading="lazy" />
        </Link>
        <span className="home-flower-card__badge">
          {available ? product.productSize : "Sold out"}
        </span>
        <button
          type="button"
          className="home-flower-card__add"
          disabled={!available}
          aria-label={`Add ${product.productName} to cart`}
          onClick={addToCart}
        >
          {added ? <CheckIcon fontSize="small" /> : <ShoppingBagOutlinedIcon fontSize="small" />}
          {available ? (added ? "Added to Cart" : "Add to Cart") : "Sold out"}
        </button>
      </div>
      <div className="home-flower-card__details">
        <Link to={detailUrl} className="home-flower-card__name">
          {product.productName}
        </Link>
        <span className="home-flower-card__price">${product.productPrice.toFixed(2)}</span>
        <p>{product.productDesc || "Thoughtfully arranged, made with love."}</p>
      </div>
      <span className="home-flower-card__announcement" role="status">
        {added ? `${product.productName} added to cart` : ""}
      </span>
    </article>
  );
}
