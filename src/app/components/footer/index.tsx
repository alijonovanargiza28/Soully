import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobal } from "../../hooks/useGlobals";

const Footers = styled.footer`
  width: 100%;
  background: #fff5f7;
  border-top: 1px solid #f1d9df;
  padding: var(--soully-section-space) 0 var(--soully-space-lg);

  .foot-category-title {
    font-size: 18px;
    font-weight: 600;
    color: #2d2d2d;
    font-family: Poppins;
  }

  .foot-category-link a,
  .find-us {
    text-decoration: none;
    color: #8a5d68;
    font-size: 15px;
    font-family: Poppins;
    transition: 0.3s;
  }

  .foot-category-link a:hover {
    color: #e91e63;
  }

  .copyright-txt {
    color: #9b6873;
    font-size: 14px;
    font-family: Poppins;
  }

  img {
    cursor: pointer;
  }
`;

export default function Footer() {
  const { authMember } = useGlobal();

  return (
    <Footers>
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} justifyContent="space-between">
          {/* LEFT */}
          <Stack sx={{ width: { xs: "100%", md: 340 } }}>
            <Box
              sx={{
                fontSize: 32,
                fontWeight: 700,
                color: "#9b6873",
                fontFamily: "Poppins",
              }}
            >
              Soully
            </Box>

            <Box
              sx={{
                mt: 2,
                color: "#9b6873",
                fontSize: 15,
                lineHeight: "26px",
              }}
            >
              Soully — flowers made with love.
              <br />
              We create beautiful bouquets and floral arrangements for every special moment.
            </Box>

            <Stack direction="row" gap={2} mt={2}>
              <img src="/icons/facebook.svg" alt="Facebook" width={22} />
              <img src="/icons/twitter.svg" alt="Twitter" width={22} />
              <img src="/icons/instagram.svg" alt="Instagram" width={22} />
              <img src="/icons/youtube.svg" alt="YouTube" width={22} />
            </Stack>
          </Stack>

          {/* EXPLORE */}
          <Stack sx={{ minWidth: 150 }}>
            <Box className="foot-category-title" sx={{ color: "#9b6873" }}>
              Explore
            </Box>

            <Stack className="foot-category-link" gap={1.5} mt={2.5}>
              <Link to="/">Home</Link>
              <Link to="/products">Flowers</Link>
              <Link to="/products">Bouquets</Link>
              {authMember && <Link to="/orders">Orders</Link>}
              <Link to="/help">Help</Link>
            </Stack>
          </Stack>

          {/* CONTACT */}
          <Stack sx={{ minWidth: 250 }}>
            <Box className="foot-category-title">Contact Us</Box>

            <Stack gap={2} mt={2.5}>
              <Box className="find-us">📍 Tashkent, Uzbekistan</Box>
              <Box className="find-us">📞 +998 90 123 45 67</Box>
              <Box className="find-us">✉️ hello@soully.uz</Box>
              <Box className="find-us">🕐 Mon – Sun, 09:00 – 22:00</Box>
            </Stack>
          </Stack>
        </Stack>

        <Box
          sx={{
            borderTop: "1px solid #e5c8cf",
            opacity: 0.6,
            mt: 3,
          }}
        />

        <Stack alignItems="center" mt={2}>
          <Box className="copyright-txt">© 2026 Soully Flowers. All rights reserved.</Box>
        </Stack>
      </Container>
    </Footers>
  );
}
