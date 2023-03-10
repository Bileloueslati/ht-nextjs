import { Stack, Container, Box } from "@mui/material";
import Nav from "./nav";
import TopBar from "./topBar";
import logo from "../../../assets/img/logo.png";
import Image from "next/image";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileNav from "./mobileNav";
import { useEffect, useReducer } from "react";
import { throttle } from "lodash";

type Reducer = {
  [key in "scrollDown" | "scrollUp" | "up"]: boolean;
};

type Actions = {
  payload: Partial<Reducer>;
};

const reducer = (state: Reducer, action: Actions) => {
  return { ...state, ...action.payload };
};

export default function Header() {
  const isDesktop = useMediaQuery("(min-width:1025px)");

  const [{ up, scrollDown, scrollUp }, setState] = useReducer(reducer, {
    scrollDown: false,
    scrollUp: false,
    up: true,
  });

  useEffect(() => {
    let previousScrollPosition = 0;

    const handleScroll = () => {
      const { scrollY } = window;

      setState({
        payload: {
          up: scrollY == 0,
          scrollDown: scrollY > 0,
        },
      });

      let scrollPosition = scrollY;

      setState({
        payload: { scrollUp: previousScrollPosition > scrollPosition },
      });

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
        position: up ? "absolute" : "fixed",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1100,
        width: "100%",
        transition: "transform .5s ease-in-out",
        transform: up || scrollUp ? "translateY(0)" : "translateY(-100%)",
        ...(scrollDown && {
          background: "#fff",
          boxShadow: "1px 11px 25px 0 rgb(0 0 0 / 7%)",
        }),
      }}
    >
      <Box
        sx={{
          display: scrollDown ? "none" : "block",
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
                height={scrollDown ? 50 : 80}
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
            {isDesktop ? (
              <Nav fixed={!up && (scrollUp || scrollDown)} />
            ) : (
              <MobileNav />
            )}
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
}
