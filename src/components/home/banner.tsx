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
import { useRef, useEffect } from "react";
import { useIntersection } from "react-use";

type props = {
  banner: {
    video: Media;
    video_image_poster: Media;
    slogan: string;
    title: string;
    description: string;
  };
};

export default function HomeBanner({
  banner: { video, video_image_poster, slogan, title, description },
}: props) {
  const { palette } = useTheme();

  console.log(video_image_poster)

  const isDesktop = useMediaQuery("(min-width:1281px)");

  const videoRef = useRef<HTMLVideoElement>(null);

  const interaction = useIntersection(videoRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
  });

  useEffect(() => {
    const playVideo = async () => {
      if (interaction && interaction.isIntersecting) {
        try {
          videoRef.current?.play();
        } catch (e: any) {
          console.log(e);
        }
      } else {
        videoRef.current?.pause();
      }
    };

    playVideo();
  }, [interaction]);

  return (
    <Stack
      direction="column"
      width="100%"
      sx={{
        position: "relative",
        overflow: "hidden",
        height: {
          lg: "100vh",
          xs: "60vh",
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
        ref={videoRef}
        component="video"
        muted
        loop
        playsInline
        poster={`${API_ENDPOINT}${video_image_poster.data.attributes.formats.large.url}`}
        sx={{
          zIndex: "-1",
          objectFit: "cover",
          minWidth: "100%",
          minHeight: "100%",
        }}
      >
        <Box
          component="source"
          type={video.data.attributes.mime}
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
