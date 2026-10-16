import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCardDetails from ".";
import { Product } from "../../../lib/types/product";

function show(stock: number) {
  const product = {
    _id: "rose",
    productName: "Blush Rose Symphony",
    productPrice: 1750000,
    productDesc: "Delicate blush roses",
    productLeftCount: stock,
  } as Product;
  render(
    <MemoryRouter>
      <ProductCardDetails product={product} />
    </MemoryRouter>,
  );
}
test.each([1, 5])("shows the actual low-stock quantity when %i remain", (stock) => {
  show(stock);
  expect(screen.getByText(`Only ${stock} left`)).toBeInTheDocument();
});
test("does not show a low-stock warning for six remaining", () => {
  show(6);
  expect(screen.queryByText(/Only .* left/)).not.toBeInTheDocument();
});
test("shows sold out rather than Only 0 left", () => {
  show(0);
  expect(screen.getByText("Sold out")).toBeInTheDocument();
  expect(screen.queryByText(/Only .* left/)).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Blush Rose Symphony" })).toHaveAttribute(
    "href",
    "/products/rose",
  );
  expect(screen.getByText("$1750000.00")).toBeInTheDocument();
});
