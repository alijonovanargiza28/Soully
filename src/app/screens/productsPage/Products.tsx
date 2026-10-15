import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Container, Stack } from "@mui/material";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { createSelector } from "reselect";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { mediaUrl } from "../../../lib/media";
import {
  parseProductSearch,
  productCollections,
  productSearchUrl,
} from "../../../lib/productSearch";
import { Product, ProductInquery } from "../../../lib/types/product";
import { CartItem } from "../../../lib/types/search";
import ProductService from "../../services/ProductService";
import { retriveProducts } from "./selector";
import { setProducts } from "./slice";

// REDUX

const productsRetriever = createSelector(retriveProducts, (products) => ({
  products,
}));

// PROPS

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

// PRODUCTS COMPONENT

export default function Products(props: ProductsProps) {
  const { onAdd } = props;

  // REDUX

  const dispatch = useDispatch();

  const { products } = useSelector(productsRetriever);

  // ROUTER

  const history = useHistory();
  const location = useLocation();

  // FLOWERS WITH MEANING CLICK

  const handleCategoryClick = (collection: ProductCollection) => {
    history.push(`/products?productCollection=${collection}`);

    window.scrollTo(0, 0);
  };

  const productSearch = useMemo(() => parseProductSearch(location.search), [location.search]);
  const [searchText, setSearchText] = useState(productSearch.search || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestVersion, setRequestVersion] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const changeSearch = (patch: Partial<ProductInquery>) =>
    history.push(productSearchUrl({ ...productSearch, ...patch }));

  useEffect(() => {
    setSearchText(productSearch.search || "");
  }, [productSearch.search]);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    new ProductService()
      .getProductPage(productSearch)
      .then(({ products, pagination }) => {
        if (!active) return;
        if (pagination.totalPages > 0 && productSearch.page > pagination.totalPages) {
          history.replace(productSearchUrl({ ...productSearch, page: pagination.totalPages }));
          return;
        }
        dispatch(setProducts(products));
        setTotalPages(pagination.totalPages);
      })
      .catch(() => {
        if (active) setError("Flowers could not be loaded. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [productSearch, dispatch, history, requestVersion]);

  const searchCollectionHandler = (collection?: ProductCollection) =>
    changeSearch({ productCollection: collection, page: 1 });
  const searchOrderHandler = (order: string) => changeSearch({ order, page: 1 });
  const searchProductHandler = () => changeSearch({ search: searchText.trim(), page: 1 });
  const paginationHandler = (_event: ChangeEvent<unknown>, page: number) => changeSearch({ page });

  // PRODUCT DETAIL

  const chooseProductHandler = (id: string) => {
    history.push(`/products/${id}`);

    window.scrollTo(0, 0);
  };

  // RETURN

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          {/* ================================================= */}
          {/* HEADER + SEARCH */}
          {/* ================================================= */}

          <Stack className={"avatar-big-box"}>
            <Stack className={"top-text"}>
              <p>Soully Flower Store</p>

              <Stack className={"single-search-big-box"}>
                <input
                  type={"search"}
                  className={"single-search-input"}
                  name={"singleResearch"}
                  placeholder={"Type here"}
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    if (!e.target.value) changeSearch({ search: "", page: 1 });
                  }}
                  aria-label="Search flowers"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchProductHandler();
                    }
                  }}
                />

                <Button
                  className={"single-button-search"}
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  Search
                </Button>
              </Stack>
            </Stack>
          </Stack>

          {/* ================================================= */}
          {/* ORDER */}
          {/* ================================================= */}

          <Stack className={"products-filter-section"}>
            <Stack className={"products-filter-box"}>
              <Button
                variant={"contained"}
                className={"order"}
                color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>

              <Button
                variant={"contained"}
                className={"order"}
                color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>

              <Button
                variant={"contained"}
                className={"order"}
                color={productSearch.order === "productViews" ? "primary" : "secondary"}
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          {/* ================================================= */}
          {/* CATEGORY */}
          {/* ================================================= */}

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button
                  variant="contained"
                  color={!productSearch.productCollection ? "primary" : "secondary"}
                  onClick={() => searchCollectionHandler()}
                >
                  All
                </Button>
                {productCollections.map((collection) => (
                  <Button
                    key={collection}
                    variant="contained"
                    color={productSearch.productCollection === collection ? "primary" : "secondary"}
                    onClick={() => searchCollectionHandler(collection)}
                  >
                    {collection.replace(/_/g, " ")}
                  </Button>
                ))}
              </div>
            </Stack>

            {/* ================================================= */}
            {/* PRODUCTS */}
            {/* ================================================= */}

            <Stack className={"product-wrapper"}>
              {loading ? (
                <Box role="status">Loading flowers...</Box>
              ) : error ? (
                <Box role="alert">
                  {error}
                  <Button onClick={() => setRequestVersion((version) => version + 1)}>Retry</Button>
                </Box>
              ) : products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = mediaUrl(product.productImages[0]);

                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => chooseProductHandler(product._id)}
                    >
                      {/* IMAGE */}

                      <Stack
                        className={"product-img"}
                        sx={{
                          backgroundImage: `url(${imagePath})`,
                        }}
                      >
                        {/* CART */}

                        <Button
                          disabled={product.productLeftCount < 1}
                          aria-label={`Add ${product.productName} to cart`}
                          className={"shop-btn"}
                          onClick={(e) => {
                            e.stopPropagation();

                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                          }}
                        >
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{
                              display: "flex",
                            }}
                            alt={"shopping cart"}
                          />
                        </Button>

                        {/* VIEWS */}

                        <Button
                          className={"view-btn"}
                          sx={{
                            right: "36px",
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Badge badgeContent={product.productViews} color={"secondary"}>
                            <RemoveRedEyeIcon
                              sx={{
                                color: product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>

                      {/* DESCRIPTION */}

                      <Box className={"product-desc"}>
                        <span className={"product-title"}>{product.productName}</span>

                        <div className={"product-desc"}>
                          <MonetizationOnIcon />

                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">No flowers match your search.</Box>
              )}
            </Stack>
          </Stack>

          {/* ================================================= */}
          {/* PAGINATION */}
          {/* ================================================= */}

          <Stack className={"pagination-section"}>
            <Pagination
              count={totalPages}
              disabled={loading || Boolean(error)}
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      {/* ===================================================== */}
      {/* FLOWERS WITH MEANING */}
      {/* ===================================================== */}

      <div className={"brands-logo"}>
        <Container className={"family-brands"}>
          <Box className={"category-title"}>Decorate Your Special Moments</Box>

          <Box className={"feeling-subtitle"}>Every arrangement tells a story.</Box>

          <Stack className={"brand-list"}>
            {/* ================================================= */}
            {/* CELEBRATION */}
            {/* ================================================= */}

            <Box
              className={"review-box meaning-card"}
              onClick={() => handleCategoryClick(ProductCollection.BIRTHDAY_DECORATION)}
            >
              <video src="/video/celebration.mp4" autoPlay muted loop playsInline />

              <div className={"meaning-overlay"}>
                <h3>Birthday Decorations</h3>

                <p>
                  Beautiful floral arrangements to make every birthday celebration unforgettable
                </p>
              </div>
            </Box>

            {/* ================================================= */}
            {/* ROMANCE */}
            {/* ================================================= */}

            <Box
              className={"review-box meaning-card"}
              onClick={() => handleCategoryClick(ProductCollection.ROMANTIC_DECORATION)}
            >
              <video src="/video/romance.mp4" autoPlay muted loop playsInline />

              <div className={"meaning-overlay"}>
                <h3>Romantic Decoration</h3>

                <p>Beautiful decor for unforgettable romantic moments.</p>
              </div>
            </Box>

            {/* ================================================= */}
            {/* BIRTHDAY */}
            {/* ================================================= */}

            <Box
              className={"review-box meaning-card"}
              onClick={() => handleCategoryClick(ProductCollection.ENGAGEMENT_DECORATOR)}
            >
              <video src="/video/birthday.mp4" autoPlay muted loop playsInline />

              <div className={"meaning-overlay"}>
                <h3>Engagement Decor</h3>

                <p>Elegant decor for beautiful engagement moments.</p>
              </div>
            </Box>

            {/* ================================================= */}
            {/* WEDDING */}
            {/* ================================================= */}

            <Box
              className={"review-box meaning-card"}
              onClick={() => handleCategoryClick(ProductCollection.WEDDING_DECOR)}
            >
              <video src="/video/wedding.mp4" autoPlay muted loop playsInline />

              <div className={"meaning-overlay"}>
                <h3>Wedding Decor</h3>

                <p>Elegant decor for your perfect wedding day.</p>
              </div>
            </Box>
            <Box
              className={"review-box meaning-card"}
              onClick={() => handleCategoryClick(ProductCollection.ANNIVERSARY_DECOR)}
            >
              <video src="/video/decorate.mp4" autoPlay muted loop playsInline />

              <div className={"meaning-overlay"}>
                <h3>Anniversary Decor</h3>

                <p>Beautiful decor for unforgettable anniversaries</p>
              </div>
            </Box>
            <Box
              className={"review-box meaning-card"}
              onClick={() => handleCategoryClick(ProductCollection.OPENING_CEREMONY)}
            >
              <video src="/video/opening.mp4" autoPlay muted loop playsInline />

              <div className={"meaning-overlay"}>
                <h3>Opening Ceremony</h3>

                <p>Beautiful blooms to make your special day extraordinary.</p>
              </div>
            </Box>
            <Box
              className={"review-box meaning-card"}
              onClick={() => handleCategoryClick(ProductCollection.BABY_DECOR)}
            >
              <video src="/video/dec.mp4" autoPlay muted loop playsInline />

              <div className={"meaning-overlay"}>
                <h3>Baby Shower Decor</h3>

                <p>Beautiful blooms to make your special day extraordinary.</p>
              </div>
            </Box>
            <Box
              className={"review-box meaning-card"}
              onClick={() => handleCategoryClick(ProductCollection.GRADUATION_DECOR)}
            >
              <video src="/video/graduation.mp4" autoPlay muted loop playsInline />

              <div className={"meaning-overlay"}>
                <h3>Graduation Decor</h3>

                <p>Elegant decor for celebrating your graduation.</p>
              </div>
            </Box>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
