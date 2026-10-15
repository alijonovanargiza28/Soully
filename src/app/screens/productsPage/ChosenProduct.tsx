import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Button, Container, Rating, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { mediaUrl } from "../../../lib/media";
import Divider from "../../components/divider";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { retriveChosenProduct, retriveSeller } from "./selector";
import { setChosenProduct, setSeller } from "./slice";

import MemberService from "../../services/MemberService";
import ProductService from "../../services/ProductService";

import { CartItem } from "../../../lib/types/search";

// Redux Actions

// Selectors
const chosenProductRetriever = createSelector(retriveChosenProduct, (chosenProduct) => ({
  chosenProduct,
}));

const sellerRetriever = createSelector(retriveSeller, (seller) => ({
  seller,
}));

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { seller } = useSelector(sellerRetriever);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    let active = true;
    setError("");
    setLoading(true);
    dispatch(setChosenProduct(null));
    const productService = new ProductService();

    productService
      .getProduct(productId)
      .then((data) => {
        if (active) dispatch(setChosenProduct(data));
      })
      .catch(() => {
        if (active) setError("This flower could not be loaded or is no longer available.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    const memberService = new MemberService();

    memberService
      .getSeller()
      .then((data) => {
        if (active) dispatch(setSeller(data));
      })
      .catch(() => {
        if (active) dispatch(setSeller(null));
      });
    return () => {
      active = false;
    };
  }, [productId, dispatch]);

  if (loading) return <Box role="status">Loading flower...</Box>;
  if (error) return <Box role="alert">{error}</Box>;
  if (!chosenProduct) return null;

  return (
    <div className="chosen-product">
      <Box className="title">Product Detail</Box>

      <Container className="product-container">
        <Stack className="chosen-product-slider">
          <Swiper
            loop={chosenProduct.productImages.length > 1}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct.productImages?.map((image: string, index: number) => (
              <SwiperSlide key={index}>
                <img
                  className="slider-image"
                  src={mediaUrl(image)}
                  alt={chosenProduct.productName}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Stack>

        <Stack className="chosen-product-info">
          <Box className="info-box">
            <strong className="product-name">{chosenProduct.productName}</strong>

            <span className="seller-name">{seller?.memberNick}</span>

            <span className="seller-name">{seller?.memberPhone}</span>

            <Box className="rating-box">
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />

              <div className="evaluation-box">
                <div className="product-view">
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct.productViews}</span>
                </div>
              </div>
            </Box>

            <p className="product-desc">{chosenProduct.productDesc || "No Description"}</p>

            <Divider height="1" width="100%" bg="#000000" />

            <div className="product-price">
              <span>Price:</span>
              <span>${chosenProduct.productPrice}</span>
            </div>

            <div className="button-box">
              <Button
                variant="contained"
                disabled={chosenProduct.productLeftCount < 1}
                onClick={(e) => {
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  });
                  e.stopPropagation();
                }}
              >
                Add To Basket
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
