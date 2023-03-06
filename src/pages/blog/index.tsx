import Banner from "@/components/common/banner";
import BlogCard from "@/components/common/blogCard";
import Layout from "@/components/layout";
import { fetchFromApi } from "@/const";
import { Article } from "@/__typescript";
import { Box, Container, Grid } from "@mui/material";

type Props = {
  articles: {
    data: Article[];
  };
};

export default function Blog({ articles: { data } }: Props) {
  return (
    <Layout>
      <Banner title="Blog" />
      <Box my={4}>
        <Container>
          <Grid container spacing={4}>
            {data.map(({ id, ...rest }) => (
              <Grid item lg={4} xs={12} key={id}>
                <BlogCard article={{ id, ...rest }} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const { data: articles } = await fetchFromApi(`/articles?populate=*`);

  return {
    props: { articles },
  };
}
