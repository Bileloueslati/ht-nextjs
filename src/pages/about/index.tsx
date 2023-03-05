import Banner from "@/components/common/banner";
import Layout from "@/components/layout";
import { fetchFromApi } from "@/const";
import { Box, Container } from "@mui/material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type Props = {
  data: {
    data: {
      attributes: {
        content: string;
      };
    };
  };
};

export default function About({
  data: {
    data: { attributes },
  },
}: Props) {
  return (
    <Layout>
      <Banner title="A propos" />

      <Box my={4} className="markdown_content">
        <Container>
          <ReactMarkdown>{attributes.content}</ReactMarkdown>
        </Container>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const { data } = await fetchFromApi("/about");

  return {
    props: { data },
  };
}
