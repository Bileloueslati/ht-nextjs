import Banner from "@/components/common/banner";
import Layout from "@/components/layout";
import { InterventionCategory } from "@/__typescript";
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  alpha,
} from "@mui/material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import Image from "next/image";
import { API_ENDPOINT, CRM_URL, fetchFromApi } from "@/const";
import { truncate } from "lodash";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GridCard from "@/components/common/gridCard";
import Seo from "@/components/common/seo";
import Grid from "@mui/material/Unstable_Grid2";

type Props = {
  category: {
    data: InterventionCategory;
  };
};

export default function Category({
  category: {
    data: {
      id,
      attributes: { name, description, slug, content, image, services, seo },
    },
  },
}: Props) {
  console.log(seo);

  return (
    <>
      <Seo
        metaTitle={seo?.metaTitle || name}
        metaDescription={seo?.metaDescription}
      />

      <Layout>
        <Banner title={name} />
        <Box
          my={5}
          pb={{
            lg: 2,
            xs: 2,
          }}
        >
          <Container>
            <Grid container sx={{ flexGrow: 1 }}>
              <Grid mdOffset={1} md={10} xs={12}>
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
                <Box
                  textAlign="center"
                  mx="auto"
                  mt={4}
                  mb={5}
                  sx={{
                    display: {
                      lg: "block",
                      xs: "none",
                    },
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    component="a"
                    href={CRM_URL}
                    target="_blank"
                  >
                    Demander un devis
                  </Button>
                </Box>

                <Grid container spacing={5}>
                  {services?.data.map(
                    ({
                      id,
                      attributes: { slug: serviceSlug, name, ...rest },
                    }) => (
                      <Grid key={id} lg={6} xs={12}>
                        <GridCard
                          link={`/intervention/${slug}/${id}/${serviceSlug}`}
                          title={name}
                          {...rest}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  const { data: category } = await fetchFromApi(
    `/services/${id}?populate[image]=*&populate[services][populate]=*&populate[seo]=*`
  );

  return {
    props: { category },
  };
}
