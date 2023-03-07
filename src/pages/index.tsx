import Articles from "@/components/home/articles";
import HomeBanner from "@/components/home/banner";
import CeoWord from "@/components/home/ceoWord";
import InterventionCategories from "@/components/home/interventionCategories";
import Temoignages from "@/components/home/temoignages";
import Layout from "@/components/layout";
import { fetchFromApi } from "@/const";
import Seo from "../components/common/seo";

export default function Home({ page, services, temoignages, articles }: any) {
  const {
    data: { attributes },
  } = page;

  const {
    data: { attributes: temoignagesAttributes },
  } = temoignages;

  return (
    <>
      <Seo
        metaTitle={attributes.seo.metaTitle}
        metaDescription={attributes.seo.metaDescription}
      />

      <Layout>
        <HomeBanner banner={attributes.banner} />
        <CeoWord data={attributes.ceo_word} />
        <InterventionCategories servicesContent={attributes.services_content} />
        <Temoignages temoignages={temoignagesAttributes.temoignages} />
        <Articles articles={articles.data} />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const urls = [
    "/home?populate[banner][populate]=*&populate[services_content][populate]=*&populate[ceo_word][populate]=*&populate[seo]=*",
    "/temoignage?populate[temoignages][populate]=*",
    "/articles?populate=*&pagination[limit]=3",
  ];

  const promises = urls.map((url) => fetchFromApi(url));

  const [page, temoignages, articles] = await Promise.all(promises);

  return {
    props: {
      page: page.data,
      temoignages: temoignages.data,
      articles: articles.data,
    },
  };
}
