import { API_ENDPOINT, CRM_URL } from "@/const";
import { Media } from "@/__typescript";
import {
  Stack,
  Box,
  Typography,
  Button,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

type props = {
  banner: {
    video: Media;
    slogan: string;
    title: string;
    description: string;
  };
};

export default function HomeBanner({
  banner: { video, slogan, title, description },
}: props) {
  const { palette } = useTheme();

  const isDesktop = useMediaQuery("(min-width:1281px)");

  return (
    <Stack
      direction="column"
      width="100%"
      sx={{
        position: "relative",
        overflow: "hidden",
        height: {
          lg: "100vh",
          xs: "70vh",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 2,
          height: "100%",
          width: "100%",
          left: 0,
          top: 0,
          backgroundColor: alpha(palette.secondary.main, 0.7),
        }}
      ></Box>
      <Box
        component="video"
        autoPlay
        muted
        loop
        sx={{
          zIndex: "-1",
          objectFit: "cover",
          minWidth: "100%",
          minHeight: "100%",
        }}
      >
        <Box
          component="source"
          src={`${API_ENDPOINT}${video.data.attributes.url}`}
        ></Box>
      </Box>

      <Box
        sx={{
          zIndex: 2,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pt: 15,
          px: {
            xs: 2.5,
            lg: 0,
          },
          width: {
            lg: "auto",
            xs: "100%",
          },
        }}
      >
        <Typography
          variant="h1"
          fontSize={{
            xs: 25,
            lg: 60,
          }}
          color="primary"
          textTransform="uppercase"
        >
          {title}
        </Typography>
        <Typography
          color="#fff"
          variant="h2"
          mb={1}
          fontSize={{
            lg: 70,
          }}
        >
          {slogan}
        </Typography>
        <Typography
          fontSize={20}
          variant="caption"
          color="white"
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
        >
          {description}
        </Typography>
        <Stack mt={3} gap={3} direction="row" justifyContent="center">
          <Button
            href={CRM_URL}
            target="_blank"
            variant="contained"
            sx={{ color: "#fff", boxShadow: "none" }}
            size={isDesktop ? "large" : "medium"}
            startIcon={<ChevronRightIcon />}
          >
            Devis gratuit
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
