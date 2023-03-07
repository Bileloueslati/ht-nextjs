import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  List,
  ListItem,
  Link,
} from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import logo from "../../../assets/img/logo.png";
import Image from "next/image";
import NextLink from "next/link";
import { useTheme } from "@mui/material/styles";
import { useGlobalContext } from "@/contexts/globalData";

const BlockTitle = ({ title }: { title: string }) => (
  <Typography
    variant="h4"
    color="primary.main"
    fontSize={18}
    fontFamily="poppins"
    fontWeight={600}
  >
    {title}
  </Typography>
);

export default function Footer() {
  const { interventions } = useGlobalContext();

  const firstNavColumn = interventions.slice(0, Math.ceil(interventions.length / 2));

  const secondNavColumn = interventions.slice(firstNavColumn.length);

  const { palette } = useTheme();

  return (
    <Box mt="auto" sx={{ backgroundColor: "#e6e6e659" }}>
      <Box
        component="footer"
        mt="auto"
        bgcolor="secondary.main"
        color="#fff"
        py={4}
      >
        <Container>
          <Grid container spacing={5}>
            <Grid item lg={4}>
              <Box position="relative" height={90} width={120} mx="auto">
                <Image
                  fill
                  src={logo}
                  alt="Health travel"
                  style={{ objectFit: "contain" }}
                />
              </Box>

              <Typography color="#fff" mt={2} fontSize={14}>
                Health Travel est une agence de tourisme médical en Tunisie
                spécialisée dans la chirurgie esthétique et plastique.
              </Typography>

              <Stack
                mt={2}
                component="ul"
                direction="row"
                spacing={1.2}
                gap={1}
                sx={{ listStyle: "none", p: 0 }}
              >
                <Stack
                  component="li"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 2,
                    width: 40,
                    height: 40,
                    p: 2,
                    textAlign: "center",
                    "&:hover": {
                      backgroundColor: "primary.main",
                    },
                  }}
                >
                  <FacebookOutlinedIcon fontSize="small" />
                </Stack>
                <Stack
                  component="li"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 2,
                    width: 40,
                    height: 40,
                    p: 2,
                    textAlign: "center",
                    "&:hover": {
                      backgroundColor: "primary.main",
                    },
                  }}
                >
                  <InstagramIcon fontSize="small" />
                </Stack>
                <Stack
                  component="li"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 2,
                    width: 40,
                    height: 40,
                    p: 2,
                    textAlign: "center",
                    "&:hover": {
                      backgroundColor: "primary.main",
                    },
                  }}
                >
                  <YouTubeIcon fontSize="small" />
                </Stack>
              </Stack>
            </Grid>

            <Grid item lg={8} xs={12}>
              <Grid
                container
                spacing={2}
                pt={{
                  lg: 2,
                  xs: 0,
                }}
              >
                <Grid item lg={8} xs={12}>
                  <BlockTitle title="Nos interventions" />
                  <Grid
                    container
                    spacing={{
                      md: 1,
                      xs: 0,
                    }}
                  >
                    <Grid item lg={6} xs={6}>
                      <List>
                        {firstNavColumn.map(
                          ({ id, attributes: { name, slug } }, i) => (
                            <ListItem disableGutters key={i}>
                              <NextLink
                                href={`/intervention/${slug}/${id}`}
                                passHref
                                legacyBehavior
                              >
                                <Link
                                  underline="none"
                                  color="#fff"
                                  sx={{
                                    transition: "all 0.5s ease-out",
                                    "&:hover": {
                                      pl: 1,
                                      "span, svg": {
                                        color: palette.primary.main,
                                      },
                                    },
                                  }}
                                >
                                  <KeyboardArrowRightOutlinedIcon
                                    fontSize="small"
                                    color="inherit"
                                  />
                                  <Typography
                                    fontSize={14}
                                    component="span"
                                    color="inherit"
                                  >
                                    {name}
                                  </Typography>
                                </Link>
                              </NextLink>
                            </ListItem>
                          )
                        )}
                      </List>
                    </Grid>

                    <Grid item lg={6} xs={6}>
                      <List>
                        {secondNavColumn.map(
                          ({ id, attributes: { name, slug } }, i) => (
                            <ListItem disableGutters key={i}>
                              <NextLink
                                href={`/intervention/${slug}/${id}`}
                                passHref
                                legacyBehavior
                              >
                                <Link
                                  underline="none"
                                  color="#fff"
                                  sx={{
                                    transition: "all 0.5s ease-out",
                                    "&:hover": {
                                      pl: 1,
                                      "span, svg": {
                                        color: palette.primary.main,
                                      },
                                    },
                                  }}
                                >
                                  <KeyboardArrowRightOutlinedIcon
                                    fontSize="small"
                                    color="inherit"
                                  />
                                  <Typography
                                    fontSize={14}
                                    component="span"
                                    color="inherit"
                                  >
                                    {name}
                                  </Typography>
                                </Link>
                              </NextLink>
                            </ListItem>
                          )
                        )}
                      </List>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item lg={4}>
                  <BlockTitle title="Contact" />
                  <List>
                    <ListItem disableGutters>
                      <LocalPhoneOutlinedIcon fontSize="small" />
                      <Typography
                        fontSize={14}
                        component="span"
                        color="#fff"
                        ml={1}
                      >
                        (+216) 21 110 088
                      </Typography>
                    </ListItem>
                    <ListItem disableGutters>
                      <AlternateEmailOutlinedIcon fontSize="small" />
                      <Typography
                        fontSize={14}
                        component="span"
                        color="#fff"
                        ml={1}
                      >
                        contact@healthtravel.fr
                      </Typography>
                    </ListItem>
                    <ListItem disableGutters>
                      <RoomOutlinedIcon fontSize="small" />
                      <Typography
                        fontSize={14}
                        component="span"
                        color="#fff"
                        ml={1}
                      >
                        1 rue de la république, les berges du lac, Tunis
                      </Typography>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
