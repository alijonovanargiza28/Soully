import { CssVarsProvider, Typography } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import { Box, Container, Stack } from "@mui/material";

export default function ActiveUsers() {
  const comments = [
    {
      id: 1,
      name: "LILY",
      image: "/img/din.jpg",
      comment: "The bouquet was absolutely beautiful. Fresh flowers and perfect arrangement!",
    },
    {
      id: 2,
      name: "DINA",
      image: "/img/shahnoza.jpg",
      comment: "I ordered flowers for my mother's birthday. Everything was elegant and lovely.",
    },
    {
      id: 3,
      name: "ANNA",
      image: "/img/madina.jpg",
      comment: "Such a beautiful bouquet! The flowers were fresh and delivery was very fast.",
    },
    {
      id: 4,
      name: "KHAN",
      image: "/img/boy.jpg",
      comment: "Soully always creates the most beautiful arrangements. Highly recommended!",
    },
  ];

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Customer's Comments</Box>

          <Stack className="cards-frame">
            <CssVarsProvider>
              {comments.map((item) => (
                <Card key={item.id} variant="outlined" className="card">
                  <CardOverflow>
                    <AspectRatio ratio="1">
                      <img src={item.image} alt={item.name} />
                    </AspectRatio>
                  </CardOverflow>

                  <CardOverflow className="comment-content">
                    <Typography className="member-nickname">{item.name}</Typography>

                    <Typography className="customer-comment">“{item.comment}”</Typography>

                    <Typography className="comment-stars">★ ★ ★ ★ ★</Typography>
                  </CardOverflow>
                </Card>
              ))}
            </CssVarsProvider>
          </Stack>
        </Stack>
        {/* ===================================================== */}
        {/* ADDRESS */}
        {/* ===================================================== */}

        <div className={"address"}>
          <Container>
            <Stack className={"address-area"}>
              <iframe
                src="https://www.google.com/maps?q=Flowers%20City%2C%20Shota%20Rustaveli%20120%2C%20Tashkent%2C%20Uzbekistan&output=embed"
                loading="lazy"
                width="1320"
                height="500"
                referrerPolicy="no-referrer-when-downgrade"
                title="Flowers City — Shota Rustaveli 120, Tashkent"
              />
            </Stack>
          </Container>
        </div>
      </Container>
    </div>
  );
}
