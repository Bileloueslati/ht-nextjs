import Banner from "@/components/common/banner";
import Seo from "@/components/common/seo";
import Layout from "@/components/layout";
import Temoignage from "@/components/temoignage";
import { fetchFromApi } from "@/const";
import { Seo as SeoT, Temoignage as TemoignageT } from "@/__typescript";
import { Container, Grid, Box } from "@mui/material";

type Props = {
  temoignages: {
    data: {
      attributes: {
        temoignages: TemoignageT[];
        seo?: SeoT;
      };
    };
  };
};

export default function Temoignages({
  temoignages: {
    data: {
      attributes: { temoignages, seo },
    },
  },
}: Props) {
  return (
    <>
      <Seo
        metaTitle={seo?.metaTitle || "Témoignages"}
        metaDescription={seo?.metaDescription}
      />
      <Layout>
        <Banner title="Temoignages" />
        <Box my={4}>
          <Container>
            <Grid container spacing={4}>
              {temoignages.map(({ id, ...rest }) => (
                <Grid item lg={4} xs={12} key={id}>
                  <Temoignage temoignage={{ id, ...rest }} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { data: temoignages } = await fetchFromApi(
    `/temoignage?populate[temoignages][populate]=*&populate[seo]=*`
  );

  return {
    props: { temoignages },
  };
}
