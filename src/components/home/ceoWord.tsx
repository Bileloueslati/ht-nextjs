import { API_ENDPOINT } from "@/const";
import { Media } from "@/__typescript";
import { Stack, Grid, Box, Container, Typography } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Image from "next/image";
// @ts-ignore
import Fade from "react-reveal/Fade";

type Props = {
  data: {
    image: Media;
    description: string;
  };
};

export default function CeoWord({ data: { image, description } }: Props) {
  return (
    <Box
      bgcolor="#fff"
      pb={{
        lg: 8,
        xs: 0,
      }}
      pt={{
        lg: 8,
        xs: 6,
      }}
    >
      <Container>
        <Grid
          container
          spacing={4}
          sx={{
            flexDirection: {
              xs: "column-reverse",
              lg: "row",
            },
            alignItems: {
              lg: "center",
            },
          }}
        >
          <Grid item lg={6} xs={12}>
            <Stack
              sx={{
                position: "relative",
                right: {
                  lg: -100,
                },
                zIndex: 2,
              }}
            >
              <Fade left>
                <Typography
                  color="primary.main"
                  variant="h2"
                  fontSize={35}
                  mb={1}
                  sx={{
                    display: {
                      lg: "block",
                      xs: "none",
                    },
                  }}
                >
                  Le mot de la directrice
                </Typography>
                <Box
                  component="blockquote"
                  ml={0}
                  pt={2}
                  position="relative"
                  sx={{
                    backgroundColor: "secondary.main",
                    px: 3,
                    pt: 6,
                    pb: 3,
                    borderRadius: 2.5,
                    mx: "auto",
                    width: {
                      lg: "100%",
                      xs: "90%",
                    },
                    top: {
                      lg: "0",
                      xs: -70,
                    },
                  }}
                >
                  <Box
                    fontSize={50}
                    color="#ccc"
                    position="absolute"
                    top={-6}
                    left={10}
                    sx={{ opacity: 0.3 }}
                  >
                    <FormatQuoteIcon fontSize="inherit" color="inherit" />
                  </Box>
                  <Typography color="#fff" fontSize={16}>
                    {description}
                  </Typography>

                  <Typography
                    color="#ccc"
                    fontSize={16}
                    fontStyle="italic"
                    textAlign="right"
                    variant="caption"
                    display="block"
                    mt={1}
                  >
                    Hallan khnissi
                  </Typography>
                </Box>
              </Fade>
            </Stack>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Fade right>
              <Box position="relative" height={400} width="100%">
                <Image
                  style={{ objectFit: "cover", borderRadius: "15px" }}
                  fill
                  src={`${API_ENDPOINT}${image.data.attributes.url}`}
                  alt={""}
                />
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
