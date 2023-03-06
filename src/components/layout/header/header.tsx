import { Stack, Container, Box } from "@mui/material";
import Nav from "./nav";
import TopBar from "./topBar";
import logo from "../../../assets/img/logo.png";
import Image from "next/image";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileNav from "./mobileNav";

export default function Header() {
  const isDesktop = useMediaQuery("(min-width:1281px)");

  return (
    <Stack
      component="header"
      sx={{
        position: "absolute",
        right: "0",
        zIndex: 1100,
        width: "100%",
      }}
    >
      <TopBar />
      <Container>
        <Stack justifyContent="space-between" direction="row">
          <Box pt={2}>
            <Link href="/">
              <Box position="relative" height={80} width={120} mx="auto">
                <Image
                  fill
                  src={logo}
                  alt="Health travel"
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Link>
          </Box>

          <Box>{isDesktop ? <Nav /> : <MobileNav />}</Box>
        </Stack>
      </Container>
    </Stack>
  );
}
