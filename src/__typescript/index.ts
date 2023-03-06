export type PageProps = {
  data: Page;
};

export type Page = {
  [key: string]: any;
};

export type Media = {
  data: {
    id: number;
    attributes: {
      url: string;
      formats: {
        thumbnail: {
          url: "string";
        };
      };
    };
  };
};

export type InterventionCategory = {
  id: number;
  attributes: {
    name: string;
    description: string;
    thumbnail: Media;
    image: Media;
    slug: string;
    content: Markdown;
    services?: {
      data: Intervention[];
    };
  };
};

export type Intervention = {
  id: number;
  attributes: {
    name: string;
    description: string;
    thumbnail: Media,
    image: Media;
    slug: string;
    content: Markdown;
    services?: {
      data: Intervention[];
    };
  };
};

export type Temoignage = {
  id: number;
  link: string;
  intervention: string;
  image: Media;
};

export type Article = {
  id: number;
  attributes: {
    title: string;
    content: Markdown;
    image: Media;
    slug: string;
  };
};

export type Pagination<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
    };
  };
};

export type Markdown = string;
