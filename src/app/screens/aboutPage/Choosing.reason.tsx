import { Box, Container, Stack } from "@mui/material";

export default function ChoosingReason() {
  return (
    <div className="why-choose-frame">
      <Container>
        {/* ===================================================== */}
        {/* WHY CHOOSE US */}
        {/* ===================================================== */}

        <Stack
          className="why-choose"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* LEFT — TEXT */}
          <Box className="why-content">
            <Box className="why-title">Why Choose Us?</Box>

            <Box className="why-text">
              At Soully, we believe flowers are more than just beautiful gifts — they are a way to
              express love, gratitude, happiness, and unforgettable emotions. 🌸 We carefully select
              fresh and beautiful flowers to make sure every bouquet looks elegant and stays fresh
              for longer.
              <br />
              <br />
              Each arrangement is thoughtfully designed with attention to every little detail,
              making it perfect for birthdays, weddings, anniversaries, celebrations, or simply to
              brighten someone's day.
              <br />
              <br />
              We offer a variety of unique bouquets and floral arrangements, created to match
              different styles, occasions, and personalities. Whether you're looking for something
              simple and delicate or luxurious and eye-catching, Soully has something special for
              you.
              <br />
              <br />
              With careful packaging, reliable delivery, and heartfelt service, we make sure your
              flowers arrive as beautiful as the moment they were created.
            </Box>

            <Box className="why-features">
              Fresh Flowers • Unique Designs • Elegant Bouquets
              <br />
              Reliable Delivery • Made With Love 💗
            </Box>
          </Box>

          {/* RIGHT — VIDEO */}
          <Box className="why-video">
            <video className="why-video-player" autoPlay muted loop playsInline>
              <source src="/video/flower.mp4" type="video/mp4" />
            </video>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
