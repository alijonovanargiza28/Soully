import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import ProductService from "../../services/ProductService";
import Products from "./Products";
import reducer from "./slice";

const page = { products: [], pagination: { page: 1, limit: 8, total: 0, totalPages: 0 } };
afterEach(() => jest.restoreAllMocks());
function renderProducts() {
  const store = configureStore({ reducer: { productsPage: reducer } });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Products onAdd={jest.fn()} />
      </MemoryRouter>
    </Provider>,
  );
}
test("default All, category selection and All restoration send correct API queries", async () => {
  const fetch = jest.spyOn(ProductService.prototype, "getProductPage").mockResolvedValue(page);
  renderProducts();
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  expect(fetch.mock.calls[0][0].productCollection).toBeUndefined();
  fireEvent.click(screen.getByRole("button", { name: "WEDDING BOUQUET" }));
  await waitFor(() =>
    expect(fetch.mock.calls[fetch.mock.calls.length - 1][0].productCollection).toBe(
      "WEDDING_BOUQUET",
    ),
  );
  fireEvent.click(screen.getByRole("button", { name: "All" }));
  await waitFor(() =>
    expect(fetch.mock.calls[fetch.mock.calls.length - 1][0].productCollection).toBeUndefined(),
  );
});
test("request failures have a retry action and never masquerade as empty search results", async () => {
  const fetch = jest
    .spyOn(ProductService.prototype, "getProductPage")
    .mockRejectedValueOnce(new Error("offline"))
    .mockResolvedValue(page);
  renderProducts();
  expect(await screen.findByRole("alert")).toHaveTextContent("could not be loaded");
  expect(screen.queryByText("No flowers match your search.")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Retry" }));
  expect(await screen.findByText("No flowers match your search.")).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledTimes(2);
});
