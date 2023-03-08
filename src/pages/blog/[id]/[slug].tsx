import Box from "@mui/material/Box";
import { GetServerSidePropsResult } from "next";
import { Article as ArticleT } from "@/__typescript";
import Layout from "@/components/layout";
import Image from "next/image";
import image from "../../../assets/img/team.jpeg";
import { Container, Divider, Grid, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { API_ENDPOINT, fetchFromApi } from "@/const";
import BlogCard from "@/components/common/blogCard";

type Props = {
  article: {
    data: ArticleT;
  };
  articles: {
    data: ArticleT[];
  };
};

export default function Article({
  articles,
  article: {
    data: { id, attributes },
  },
}: Props) {
  return (
    <Layout>
      <Box
        sx={{
          height: 400,
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
            backgroundColor: "rgba(19, 35, 47, 0.63)",
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
            fontSize={20}
          >
            Blog
          </Typography>
          <Typography
            variant="h1"
            fontSize={{
              xs: 22,
              lg: 40,
            }}
            color="#fff"
          >
            {attributes.title}
          </Typography>
        </Box>
      </Box>

      <Box my={5}>
        <Container>
          <Grid container>
            <Grid item lg={8} xs={12}>
              <Box position="relative" height={250}>
                <Image
                  src={`${API_ENDPOINT}/${attributes.image.data.attributes.url}`}
                  alt={attributes.title}
                  style={{ borderRadius: "15px" }}
                  fill
                />
              </Box>

              <ReactMarkdown className="markdown_content">
                {attributes.content}
              </ReactMarkdown>

              <Divider />

              <Box mt={3}>
                <Typography
                  variant="h1"
                  fontSize={{
                    xs: 22,
                    lg: 25,
                  }}
                  color="primary.main"
                  mb={2}
                >
                 A lire aussi
                </Typography>

                <Grid container spacing={3}>
                  <Grid item lg={6} xs={12}>
                    {articles.data
                      .filter((current) => current.id !== id)
                      .map((article, id) => (
                        <BlogCard key={id} article={article} />
                      ))}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  const [article, articles] = await Promise.all([
    fetchFromApi(`/articles/${id}?populate=*`),
    fetchFromApi(`/articles?populate=*`),
  ]);

  return {
    props: { article: article.data, articles: articles.data },
  };
}
