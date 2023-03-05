import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { GetServerSidePropsResult } from "next";
import http from "@/libs/axios";
import { Article as ArticleT } from "@/__typescript";
import Layout from "@/components/layout";
import Image from "next/image";
import image from "../../../assets/img/team.jpeg";
import { Container, Grid, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

type Props = {
  article: {
    data: ArticleT;
  };
};

export default function Article({
  article: {
    data: { attributes },
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
              xs: 30,
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
              <ReactMarkdown className="blog_content">
                {attributes.content}
              </ReactMarkdown>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  const { data: article } = await http(`/articles/${id}?populate=*`);

  return {
    props: { article },
  };
}
