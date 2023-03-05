import {
  Box,
  alpha,
  useTheme,
  Container,
  Stack,
  Typography,
  Button,
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
            <Box
              component="li"
              sx={{
                display: {
                  xs: "none",
                  lg: "block",
                },
              }}
            >
              <Link href="/">
                <Typography
                  component="span"
                  color="#fff"
                  fontFamily="poppins"
                  fontWeight={300}
                  fontSize={14}
                >
                  Avant & Aprés
                </Typography>
              </Link>
            </Box>
            <Box
              component="li"
              sx={{
                display: {
                  xs: "none",
                  lg: "block",
                },
              }}
            >
              <Link href="/">
                <Typography
                  component="span"
                  color="#fff"
                  fontFamily="poppins"
                  fontWeight={300}
                  fontSize={14}
                >
                  Témoignages
                </Typography>
              </Link>
            </Box>

            <Box component="li">
              <Button variant="text" size="small" startIcon={<CalendarMonthIcon />}>
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
