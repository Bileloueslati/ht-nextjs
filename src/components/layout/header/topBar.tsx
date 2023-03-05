import {
  Box,
  alpha,
  useTheme,
  Container,
  Stack,
  Button,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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
                name: "Avant & Aprés",
                link: "",
              },
              {
                name: "Témoignages",
                link: "",
              },
              {
                name: "Blog",
                link: "",
              },
            ].map(({ name }, i) => (
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
                <Link href="/" passHref legacyBehavior>
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
              <Button
                variant="text"
                size="small"
                startIcon={<CalendarMonthIcon />}
              >
                Prenez rendez-vous
              </Button>
            </Box>
            <Box component="li">
              <Stack
                component="ul"
                direction="row"
                spacing={2.5}
                sx={{ listStyle: "none", p: 0 }}
              >
                <Stack
                  component="li"
                  sx={{
                    color: "#fff",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  <FacebookOutlinedIcon fontSize="small" />
                </Stack>
                <Stack
                  component="li"
                  sx={{
                    color: "#fff",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  <InstagramIcon fontSize="small" />
                </Stack>
                <Stack
                  component="li"
                  sx={{
                    color: "#fff",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  <YouTubeIcon fontSize="small" />
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
