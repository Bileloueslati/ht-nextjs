import { Temoignage as TemoignageT } from "@/__typescript";
import { Box, Container, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Temoignage from "../temoignage";

type Props = {
  temoignages: TemoignageT[];
};

const swiperConfig = {
  slidesPerView: 3,
  spaceBetween: 40,
  loop: true,
  autoplay: {
    delay: 2000,
  },
  breakpoints: {
    320: {
      slidesPerView: 1.2,
      centeredSlides: true,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
};

export default function Temoignages({ temoignages }: Props) {
  return (
    <Box py={8}>
      <Container>
        <Box sx={{ textAlign: "center", mx: "auto", maxWidth: "500px", mb: 4 }}>
          <Typography
            variant="h2"
            fontSize={30}
            color="primary.main"
            mb={0}
            lineHeight={1}
            pb="10px"
          >
            Témoignages
          </Typography>
        </Box>
        <Swiper {...swiperConfig} modules={[Autoplay]}>
          {temoignages.map((temoignage) => (
            <SwiperSlide key={temoignage.id}>
              <Temoignage temoignage={temoignage} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}
