import { Temoignage as TemoignageT } from "@/__typescript";
import { Box, Button, Container, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Temoignage from "../temoignage";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";

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
  const isDesktop = useMediaQuery("(min-width:1281px)");

  return (
    <Box py={8}>
      <Container>
        <Box sx={{ textAlign: "center", mx: "auto", maxWidth: "650px", mb: 4 }}>
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
          <Typography fontSize={{
              lg: 18,
              xs: 16
          }} variant="caption" sx={{ display: "block" }}>
            Nos patients partagent leurs expériences et témoignent leurs
            satisfactions pendant leurs séjours de tourisme médical en Tunisie
          </Typography>
          <Link passHref legacyBehavior href="/temoignages">
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              size={isDesktop ? "large" : "medium"}
              startIcon={<ChevronRightIcon />}
            >
              Voir tous les témoignages
            </Button>
          </Link>
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
