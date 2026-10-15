import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { Box, Container, Stack } from "@mui/material";

export default function Statistics() {
  return (
    <div className="static-frame">
      <Container>
        <Stack className="benefits">
          <Stack className="benefit-box">
            <Box className="benefit-icon">
              <LocalShippingOutlinedIcon />
            </Box>

            <Box className="benefit-title">Free Delivery</Box>

            <Box className="benefit-text">Free delivery on selected orders</Box>
          </Stack>

          <Stack className="benefit-box">
            <Box className="benefit-icon">
              <ReplayOutlinedIcon />
            </Box>

            <Box className="benefit-title">10-Day Return</Box>

            <Box className="benefit-text">Easy returns within 10 days</Box>
          </Stack>

          <Stack className="benefit-box">
            <Box className="benefit-icon">
              <VerifiedUserOutlinedIcon />
            </Box>

            <Box className="benefit-title">Secure Payment</Box>

            <Box className="benefit-text">Your payment is always protected</Box>
          </Stack>

          <Stack className="benefit-box">
            <Box className="benefit-icon">
              <FavoriteBorderOutlinedIcon />
            </Box>

            <Box className="benefit-title">Made With Love</Box>

            <Box className="benefit-text">Every bouquet is carefully prepared</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
