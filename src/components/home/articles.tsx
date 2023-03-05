import { API_ENDPOINT } from "@/const";
import { Article } from "@/__typescript";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import Image from "next/image";
import { truncate } from "lodash";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";

type Props = {
  articles: Article[];
};

export default function Articles({ articles }: Props) {
  return (
    <Box mt={6} py={8} sx={{ background: "#e6e6e659" }}>
      <Container>
        <Box sx={{ textAlign: "center", mx: "auto", maxWidth: "500px", mb: 4 }}>
          <Typography
            variant="h2"
            fontSize={30}
            color="primary.main"
            mb={0}
            lineHeight={1}
            pb="10px"
          >
            Blog et actualités
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {articles.map(({ id, attributes }) => (
            <Grid item lg={4} xs={12} key={id}>
              <Box height={300} position="relative">
                <Image
                  src={`${API_ENDPOINT}${attributes.image.data.attributes.url}`}
                  alt={attributes.title}
                  style={{ borderRadius: 10 }}
                  fill
                />
              </Box>
              <Box
                sx={{
                  transition: "all .4s ease;",
                  boxShadow: "-1.216px 6.894px 25px 0 rgb(0 0 0 / 7%)",
                  borderRadius: "10px",
                  mx: "auto",
                  position: "relative",
                  width: "90%",
                  textAlign: "center",
                  padding: "15px 30px",
                  mt: "-60px",
                  backgroundColor: "#fff",
                }}
              >
                <Typography variant="h3" mb={1} fontSize={18}>
                  {attributes.title}
                </Typography>
                <Typography>
                  {truncate(attributes.content, {
                    length: 80,
                    separator: " ",
                  })}
                </Typography>
                <Link
                  href={`/blog/${id}/${attributes.slug}`}
                  passHref
                  legacyBehavior
                >
                  <Button startIcon={<KeyboardArrowRightIcon />} variant="text">
                    Lire la suite
                  </Button>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
