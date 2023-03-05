import { API_ENDPOINT } from "@/const";
import { Media } from "@/__typescript";
import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import { truncate } from "lodash";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  link: string;
  image: Media;
};

export default function GridCard({ title, description, link, image }: Props) {
  return (
    <Box
    
      sx={{
        transition: "all .4s ease",
        "&:hover": {
          ".content": {
            height: "160px",
            "&:before, &:after": {
              opacity: 1,
            },
          },
          ".description": {
            opacity: 1,
          },
        },
      }}
    >
      <Box>
        <Box position="relative" height={250}>
          <Link href={link}>
            <Image
              style={{ objectFit: "cover", borderRadius: "10px" }}
              fill
              src={`${API_ENDPOINT}${image.data.attributes.url}`}
              alt={"name"}
            />
          </Link>
        </Box>
        <Stack
          className="content"
          direction="column"
          gap={1}
          sx={{
            transition: "all .4s ease;",
            boxShadow: "-1.216px 6.894px 25px 0 rgb(0 0 0 / 7%)",
            borderRadius: "10px",
            mx: "auto",
            position: "relative",
            width: "90%",
            textAlign: "center",
            padding: "15px 20px",
            mt: "-40px",
            backgroundColor: "#fff",
            height: 70,
            "&:before": {
              position: "absolute",
              content: `""`,
              left: "50%",
              transform: "translateX(-50%)",
              transition: "all .4s ease",
              zIndex: "-1",
              borderRadius: "10px",
              backgroundColor: "#fff",
              boxShadow: "-1.216px 6.894px 25px 0 rgb(0 0 0 / 7%)",
              width: "calc(100% - 20px)",
              bottom: "-10px",
              height: "100%",
              opacity: 0,
            },
            "&:after": {
              position: "absolute",
              content: `""`,
              left: "50%",
              transform: "translateX(-50%)",
              transition: "all .4s ease",
              zIndex: "-2",
              borderRadius: "10px",
              backgroundColor: "#fff",
              boxShadow: "-1.216px 6.894px 25px 0 rgb(0 0 0 / 7%)",
              width: "calc(100% - 40px)",
              bottom: "-20px",
              height: "100%",
              opacity: 0,
            },
          }}
        >
          <Typography
            variant="h2"
            fontSize={18}
            fontWeight={600}
            mb={0}
            lineHeight={1}
            pt="10px"
            pb="15px"
          >
            {title}
          </Typography>
          <Box
            className="description"
            sx={{ opacity: 0, transition: "opacity .4s ease" }}
          >
            <Typography variant="caption" fontSize={13}>
              {truncate(description, { length: 100 })}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
