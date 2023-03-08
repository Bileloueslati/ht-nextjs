import { Box, Typography } from "@mui/material";
import Image from "next/image";
import image from "../../assets/img/team.jpeg"; 

type Props = {
  title: string;
  subtitle?: string;
};

export default function Banner({ title, subtitle = "Health Travel" }: Props) {
  return (
    <Box
      sx={{
        height: 450,
        position: "relative",
      }}
    >
      <Image
        src={image}
        style={{
          objectFit: "cover",
        }}
        alt=""
        fill
      />
      <Box
        sx={{
          position: "absolute",
          zIndex: 2,
          height: "100%",
          width: "100%",
          left: 0,
          top: 0,
          backgroundColor: "rgba(19, 35, 47, 0.8)",
        }}
      ></Box>

      <Box
        sx={{
          zIndex: 2,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pt: 15,
        }}
      >
        <Typography
          variant="caption"
          fontWeight={500}
          color="primary"
          fontSize={22}
        >
          {subtitle}
        </Typography>
        <Typography
          variant="h1"
          fontSize={{
            xs: 30,
            lg: 45,
          }}
          color="#fff"
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
