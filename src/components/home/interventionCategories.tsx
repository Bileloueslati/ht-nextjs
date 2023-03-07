import { API_ENDPOINT, CRM_URL } from "@/const";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
// @ts-ignore
import Fade from "react-reveal/Fade";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGlobalContext } from "@/contexts/globalData";

type Props = {
  servicesContent: {
    title: string;
    description: string;
  };
};

export default function InterventionCategories({
  servicesContent: { title, description },
}: Props) {
  const isDesktop = useMediaQuery("(min-width:1281px)");

  const { interventions } = useGlobalContext();

  return (
    <Box py={8} sx={{ background: "#e6e6e659" }}>
      <Container>
        <Box sx={{ textAlign: "center", mx: "auto", maxWidth: "750px", mb: 4 }}>
          <Typography
            variant="h2"
            fontSize={30}
            color="primary.main"
            mb={0}
            lineHeight={1}
            pb="10px"
          >
            {title}
          </Typography>

          <Typography
            fontSize={{
              lg: 18,
              xs: 16,
            }}
            variant="caption"
            sx={{ display: "block" }}
          >
            {description}
          </Typography>

          <Button
            target="_blank"
            href={CRM_URL}
            variant="contained"
            sx={{ mt: 2 }}
            size={isDesktop ? "large" : "medium"}
            startIcon={<ChevronRightIcon />}
          >
            Demander un devis
          </Button>
        </Box>

        <Grid
          container
          spacing={{
            lg: 5,
            xs: 6,
          }}
          mt={0.6}
        >
          {interventions.map(
            ({ id, attributes: { slug, name, description, thumbnail } }) => (
              <Grid
                key={id}
                item
                lg={4}
                xs={12}
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
                <Fade bottom>
                  <Box>
                    <Box position="relative" height={250}>
                      <Link href={`/intervention/${slug}/${id}`}>
                        <Image
                          style={{ objectFit: "cover", borderRadius: "10px" }}
                          fill
                          src={`${API_ENDPOINT}${thumbnail.data.attributes.url}`}
                          alt={name}
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
                        height: {
                          lg: 70,
                        },
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
                          opacity: {
                            lg: 0,
                          },
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
                          opacity: {
                            lg: 0,
                          },
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
                        {name}
                      </Typography>
                      <Box
                        className="description"
                        sx={{
                          opacity: {
                            lg: 0,
                          },
                          transition: "opacity .4s ease",
                        }}
                      >
                        <Typography variant="caption" fontSize={13}>
                          {description}
                        </Typography>
                        <Link
                          href={`/intervention/${slug}/${id}`}
                          passHref
                          legacyBehavior
                        >
                          <Button
                            component="a"
                            sx={{ mt: 2 }}
                            variant="contained"
                          >
                            En savoir plus
                          </Button>
                        </Link>
                      </Box>
                    </Stack>
                  </Box>
                </Fade>
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </Box>
  );
}
