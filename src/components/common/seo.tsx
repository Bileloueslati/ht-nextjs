import { Seo as SeoT } from "@/__typescript";
import { NextSeo } from "next-seo";

type Props = {
  [key in keyof SeoT]?: string;
};

export default function Seo({ metaTitle = "", metaDescription = "" }: Props) {
  return (
    <NextSeo
      title={`${metaTitle} - Health travel`}
      description={metaDescription}
    />
  );
}
