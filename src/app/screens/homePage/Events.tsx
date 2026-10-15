import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Autoplay, Navigation, Pagination]);

const flowerEvents = [
  {
    img: "/img/wedding.jpg",
    title: "Wedding Flowers",
    author: "Soully Flowers",
    desc: "Elegant and romantic floral arrangements created especially for your special day.",
    date: "Available Every Day",
    location: "Soully Flower Studio",
  },
  {
    img: "/img/birthday.jpg",
    title: "Birthday Bouquets",
    author: "Soully Flowers",
    desc: "Make someone's birthday unforgettable with a beautiful bouquet full of love.",
    date: "Available Every Day",
    location: "Soully Flower Studio",
  },
  {
    img: "/img/romantic.jpg",
    title: "Romantic Flowers",
    author: "Soully Flowers",
    desc: "Express your feelings with fresh and elegant flowers made with love.",
    date: "Available Every Day",
    location: "Soully Flower Studio",
  },
];

export default function Events() {
  return (
    <div className={"events-frame"}>
      <Stack className={"events-main"}>
        <Box className={"events-text"}>
          <span className={"category-title"}>Special Moments</span>
        </Box>

        <Swiper
          className={"events-info"}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {flowerEvents.map((value, number) => {
            return (
              <SwiperSlide key={number} className={"events-info-frame"}>
                <div className={"events-img"}>
                  <img src={value.img} className={"events-img"} alt={value.title} />
                </div>

                <Box className={"events-desc"}>
                  <Box className={"events-bott"}>
                    <Box className={"bott-left"}>
                      <div className={"event-title-speaker"}>
                        <strong>{value.title}</strong>

                        <div className={"event-organizator"}>
                          <p className={"spec-text-author"}>{value.author}</p>
                        </div>
                      </div>

                      <p className={"text-desc"}>{value.desc}</p>

                      <div className={"bott-info"}>
                        <div className={"bott-info-main"}>🌸 {value.date}</div>

                        <div className={"bott-info-main"}>📍 {value.location}</div>
                      </div>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <Box className={"prev-next-frame"}>
          <img src={"/icons/arrow-right.svg"} className={"swiper-button-prev"} alt="previous" />

          <div className={"dot-frame-pagination swiper-pagination"}></div>

          <img
            src={"/icons/arrow-right.svg"}
            className={"swiper-button-next"}
            alt="next"
            style={{ transform: "rotate(-180deg)" }}
          />
        </Box>
      </Stack>
    </div>
  );
}
