import { Stack, Container, Box } from "@mui/material";
import Nav from "./nav";
import TopBar from "./topBar";
import logo from "../../../assets/img/logo.png";
import Image from "next/image";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileNav from "./mobileNav";
import { useEffect, useState } from "react";
import { throttle } from "lodash";

export default function Header() {
  const isDesktop = useMediaQuery("(min-width:1281px)");

  const [fixed, setFixed] = useState<boolean | null>(null);

  useEffect(() => {
    let previousScrollPosition = 0;

    let goingDown = false;

    const handleScroll = () => {
      const { pageYOffset } = window;

      let scrollPosition = pageYOffset;

      let goingUp = previousScrollPosition > scrollPosition;

      if (pageYOffset == 0) {
        setFixed(null);
      } else if (goingUp) {
        setFixed(true);
      } else {
        setFixed(false);
      }

      previousScrollPosition = scrollPosition;
    };

    const throttleHandler = throttle(handleScroll, 100);

    window.addEventListener("scroll", throttleHandler);

    return () => {
      window.removeEventListener("scroll", throttleHandler);
    };
  }, []);

  return (
    <Stack
      component="header"
      sx={{
        position: "fixed",
        right: "0",
        zIndex: 1100,
        width: "100%",
        boxShadow: fixed ? "1px 11px 25px 0 rgb(0 0 0 / 7%)" : "none",
        transition: "transform 330ms ease-in-out",
        transform:
          fixed == true || fixed === null
            ? "translateY(0)"
            : "translateY(-100%)",
        background: fixed ? "#fff" : "transparent",
      }}
    >
      <Box
        sx={{
          display: fixed ? "none" : "block",
        }}
      >
        <TopBar />
      </Box>
      <Container>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          sx={{
            py: {
              lg: 0,
              xs: 1,
            },
          }}
        >
          <Box>
            <Link href="/">
              <Box
                position="relative"
                height={fixed ? 50 : 80}
                width={120}
                mx="auto"
              >
                <Image
                  fill
                  src={logo}
                  alt="Health travel"
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Link>
          </Box>

          <Box>
            {isDesktop ? <Nav fixed={Boolean(fixed)} /> : <MobileNav />}
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
}
