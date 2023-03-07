import { Temoignage as TemoignageT } from "@/__typescript";
import {
  Box,
  alpha,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { API_ENDPOINT } from "@/const";
import { useTheme } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  temoignage: TemoignageT;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
  width: {
    lg: "auto",
    xs: "95%",
  },
};

export default function Temoignage({
  temoignage: { link, intervention, image },
}: Props) {
  const videoId = link.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)?.pop();

  const { palette } = useTheme();

  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const isDesktop = useMediaQuery("(min-width:1281px)");

  const handleIsLoaded = () => {
    setIsLoading(false);
  };

  const handleIsLoading = () => {
    setIsLoading(true);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    handleIsLoading();
  };

  const [imageSrc, setImageSrc] = useState<string>(
    `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`
  );

  if (!videoId) return null;

  return (
    <>
      <Box
        onClick={handleOpen}
        position="relative"
        sx={{
          backgroundColor: alpha(palette.secondary.main, 0.7),
          borderRadius: "10px",
          cursor: "pointer",
          "&:hover": {
            ".img": {
              transform: "scale(1.2)",
            },
          },
        }}
      >
        <Box position="relative" height={350} zIndex={-1} overflow="hidden">
          <Image
            className="img"
            src={imageSrc}
            fill
            alt={intervention}
            style={{
              borderRadius: "10px",
              transition: "transform 1000ms ease-in-out",
              transformOrigin: "left top",
              objectFit: "cover",
            }}
            onError={() => {
              setImageSrc(`${API_ENDPOINT}${image.data.attributes.url}`);
            }}
          />
        </Box>
        <Box
          position="absolute"
          fontSize="large"
          textAlign="center"
          sx={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <IconButton
            sx={{ color: palette.primary.main, fontSize: 60 }}
            onClick={handleOpen}
          >
            <PlayCircleIcon fontSize="inherit" color="inherit" />
          </IconButton>
          <Typography variant="h3" fontSize={20} color="#fff">
            {intervention}
          </Typography>
        </Box>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            {isLoading && (
              <Box sx={{ ...style, width: "auto", display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
            <Box
              component="iframe"
              sx={{ border: "1px solid #fff" }}
              width={isDesktop ? 700 : "100%"}
              height={400}
              src={`https://www.youtube.com/embed/${videoId}`}
              title={intervention}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              onLoad={handleIsLoaded}
              allowFullScreen
            />
            <Box position="absolute" top={-40} right={0}>
              <IconButton
                sx={{ color: palette.primary.main, fontSize: 30 }}
                onClick={handleClose}
              >
                <CloseIcon fontSize="inherit" color="inherit" />
              </IconButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
