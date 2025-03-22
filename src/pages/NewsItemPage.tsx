/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "../lib/sanity";
import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PageContainer } from "../styles/Container";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

type NewsItemProps = {
  title: string;
  slug: string;
  image: string;
  content: any;
};
//  image: ({ value }) => {
//     try {
//       const image = builder.image(value);
//       const url = image.url();
//       return (
//         <Image
//           alt=""
//           width={1000}
//           height={1000}
//           src={url}
//           className="my-6 w-full max-w-[672px] h-auto mx-auto"
//         />
//       );
//     } catch {
//       return null;
//     }
//   },
const builder = imageUrlBuilder(client);
const portableComponent = {
  types: {
    image: ({ value }: any) => {
      const image = builder.image(value);
      const url = image.url();
      return (
        <img
          src={url}
          alt="portable-img"
          className="w-full h-full max-w-[796px] mx-auto"
        />
      );
    },
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 text-blue_light px-1 py-0.5 rounded">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          className="underline underline-offset-2 text-primary_60 text-green-800"
          rel={rel}
        >
          {children}
        </a>
      );
    },
    textColor: ({ children, value }: any) => (
      <span style={{ color: value.value }}>{children}</span>
    ),
    highlightColor: ({ children, value }: any) => (
      <span style={{ background: value.value }}>{children}</span>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="font-bold text-4xl mt-6 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-bold text-3xl mt-5 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-bold text-2xl mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-semibold text-xl mt-3 mb-2">{children}</h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="font-semibold text-lg mt-3 mb-1">{children}</h5>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-primary">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mt-lg list-disc list-inside">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mt-lg list-decimal list-inside">{children}</ol>
    ),
  },
};

export default function NewsItemPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const curr_lng = i18n.language as "en" | "ina" | "zh";
  const [newsData, setNewsData] = useState<NewsItemProps | null>(null);
  useEffect(() => {
    if (!slug) return;
    const fetchNewsItem = async () => {
      const parts = slug.split("_").filter(Boolean);
      const main_url = parts[0];
      const url = `${main_url}_${curr_lng}`;
      console.log(main_url);
      try {
        const data =
          await client.fetch(`*[_type == 'news' && slug.current == "${url}" && is_published == true && locale == "${curr_lng}"][0] {
              title,
              "slug": slug.current,
              "image": image.asset->url,
              content
            }`);
        console.log(data);
        setNewsData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewsItem();
  }, [curr_lng, slug]);
  console.log(newsData);
  return (
    <PageContainer>
      <section className="py-[60px]" id="news-item">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 text-dark_60 text-xs md:text-base">
            <Link to="/news" className="hover:font-medium hover:underline">
              {t("nav_news")}
            </Link>
            <p>/</p>
            <Link
              to={`/news/${slug}`}
              className="hover:font-medium underline truncate"
            >
              {newsData?.title}
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">{newsData?.title}</h1>
            <img
              src={newsData?.image}
              alt={newsData?.title}
              className="w-full h-auto aspect-video max-w-[720px] mx-auto object-cover"
            />
            <PortableText
              value={newsData?.content}
              components={portableComponent}
            />
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
