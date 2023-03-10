import Banner from "@/components/common/banner";
import Seo from "@/components/common/seo";
import Layout from "@/components/layout";
import { API_ENDPOINT, CRM_URL, fetchFromApi } from "@/const";
import { Intervention, Pagination } from "@/__typescript";
import { Box, Button, Container, Grid } from "@mui/material";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type Props = {
  intervention: Intervention;
};

export default function InterventionService({
  intervention: {
    attributes: { name, content, image, seo },
  },
}: Props) {
  return (
    <>
      <Seo
        metaTitle={seo?.metaTitle || name}
        metaDescription={seo?.metaDescription}
      />

      <Layout>
        <Banner title={name} />
        <Box
          my={2}
          pb={{
            lg: 2,
            xs: 2,
          }}
        >
          <Container>
            <Grid
              container
              spacing={{
                lg: 4,
                xs: 2,
              }}
            >
              <Grid item lg={8} xs={12}>
                <Box position="relative" height={300}>
                  <Image
                    src={`${API_ENDPOINT}${image.data.attributes.url}`}
                    alt={name}
                    style={{
                      borderRadius: "15px",
                    }}
                    fill
                  />
                </Box>
                <ReactMarkdown className="markdown_content">
                  {content}
                </ReactMarkdown>
                <Box textAlign="center" mx="auto" mt={4} mb={5}>
                  <Button
                    variant="contained"
                    size="large"
                    component="a"
                    href={CRM_URL}
                    target="_blank"
                    startIcon={<ChevronRightIcon />}
                  >
                    Demander un devis
                  </Button>
                </Box>
              </Grid>

              <Grid item lg={4} xs={12}></Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { service_slug } = context.query;

  const { data: resData } = await fetchFromApi<Pagination<Intervention>>(
    `/intervenions?filters[slug]=${service_slug}&populate=*`
  );

  // @ts-ignore
  if (!resData.data.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: { intervention: resData.data[0] },
  };
}
