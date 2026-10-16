import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Link } from "react-router-dom";
import { Product } from "../../../lib/types/product";
import "./styles.css";

export default function ProductCardDetails({ product }: { product: Product }) {
  const lowStock = product.productLeftCount > 0 && product.productLeftCount < 6;
  return (
    <div className="flower-card-details">
      <div className="flower-card-details__top">
        <span className="flower-card-details__price">${product.productPrice.toFixed(2)}</span>
        {lowStock && (
          <span className="flower-card-details__stock">
            <WarningAmberRoundedIcon aria-hidden="true" />
            Only {product.productLeftCount} left
          </span>
        )}
        {product.productLeftCount < 1 && (
          <span className="flower-card-details__stock">Sold out</span>
        )}
      </div>
      <Link
        className="flower-card-details__name"
        to={`/products/${product._id}`}
        onClick={(event) => event.stopPropagation()}
      >
        {product.productName}
      </Link>
      <p className="flower-card-details__description">
        {product.productDesc || "Thoughtfully arranged, made with love."}
      </p>
    </div>
  );
}
