import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { truncate } from "lodash";
import { Article } from "@/__typescript";
import { API_ENDPOINT } from "@/const";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type Props = {
  article: Article;
};

export default function BlogCard({ article: { id, attributes } }: Props) {
  return (
    <>
      <Box height={250} position="relative">
        <Link href={`/blog/${id}/${attributes.slug}`}>
          <Image
            src={`${API_ENDPOINT}${attributes.image.data.attributes.url}`}
            alt={attributes.title}
            style={{ borderRadius: 10 }}
            fill
          />
        </Link>
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

        <Box
          sx={{
            p: {
              fontSize: 14,
            },
          }}
        >
          <ReactMarkdown skipHtml allowedElements={["p"]}>
            {truncate(attributes.content, {
              length: 80,
              separator: " ",
            })}
          </ReactMarkdown>
        </Box>
        <Link href={`/blog/${id}/${attributes.slug}`} passHref legacyBehavior>
          <Button startIcon={<KeyboardArrowRightIcon />} variant="text">
            Lire la suite
          </Button>
        </Link>
      </Box>
    </>
  );
}
