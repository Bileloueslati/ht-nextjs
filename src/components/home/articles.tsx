import { Article } from "@/__typescript";
import { Box, Container, Grid, Typography } from "@mui/material";
import BlogCard from "../common/blogCard";

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
          {articles.map(({ id, ...rest }) => (
            <Grid item lg={4} xs={12} key={id}>
              <BlogCard article={{ id, ...rest }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
