import {
  Box,
  alpha,
  useTheme,
  Container,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Appointement from "./appointement";
import { cloneElement } from "react";
import { socialUrls } from "@/const/data";

export default function TopBar() {
  const {
    palette: { secondary },
  } = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: alpha(secondary.main, 0.4),
        py: {
          lg: 2,
          xs: 1,
        },
      }}
    >
      <Container>
        <Stack alignItems="end">
          <Stack
            component="ul"
            direction="row"
            spacing={{
              lg: 4,
              xs: 2,
            }}
            alignItems="center"
            sx={{ p: 0, m: 0 }}
          >
            {[
              {
                name: "Contact",
                link: "/contact",
              },
              {
                name: "Témoignages",
                link: "/temoignages",
              },
              {
                name: "Blog",
                link: "/blog",
              },
            ].map(({ name, link }, i) => (
              <Box
                key={i}
                component="li"
                sx={{
                  display: {
                    xs: "none",
                    lg: "block",
                  },
                }}
              >
                <Link href={link} passHref legacyBehavior>
                  <MuiLink
                    underline="none"
                    color="#fff"
                    sx={{
                      fontSize: 14,
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {name}
                  </MuiLink>
                </Link>
              </Box>
            ))}

            <Box component="li">
              <Appointement />
            </Box>
            <Box component="li">
              <Stack
                component="ul"
                direction="row"
                spacing={{
                  lg: 2.5,
                  xs: 1.5,
                }}
                sx={{ p: 0, m: 0 }}
              >
                {[
                  {
                    icon: <FacebookOutlinedIcon />,
                    link: socialUrls.facebook,
                  },
                  {
                    icon: <InstagramIcon />,
                    link: socialUrls.instagram,
                  },
                  {
                    icon: <YouTubeIcon />,
                    link: socialUrls.youtube,
                  },
                ].map(({ icon, link }, i) => (
                  <Stack key={i} component="li">
                    <Box
                      component="a"
                      href={link}
                      target="_blank"
                      sx={{
                        fontSize: {
                          lg: 23,
                          xs: 14,
                        },
                        color: "#fff",
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      {cloneElement(icon, {
                        fontSize: "inherit",
                        color: "inherit",
                      })}
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
