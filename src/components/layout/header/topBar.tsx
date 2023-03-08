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
      }}
    >
      <Container>
        <Stack alignItems="end">
          <Stack component="ul" direction="row" spacing={4} alignItems="center">
            {[
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
                spacing={2.5}
                sx={{ listStyle: "none", p: 0 }}
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
                  <Stack
                    key={i}
                    component="li"
                    sx={{
                      a: {
                        color: "#fff",
                        "&:hover": {
                          color: "primary.main",
                        },
                      },
                    }}
                  >
                    <a href={link} target="_blank">
                      {cloneElement(icon, { size: "small", color: "inherit" })}
                    </a>
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
