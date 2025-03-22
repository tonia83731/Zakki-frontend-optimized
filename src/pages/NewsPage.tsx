import { client } from "../lib/sanity";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageContainer from "../components/common/PageContainer";
import { PageTitle } from "../components/common/PageTitle";
import dayjs from "dayjs";
import { Pagination } from "../components/common/Pagination";
import Loading from "../components/common/Loading";

export default function NewsPage() {
  const { t, i18n } = useTranslation();
  const curr_lng = i18n.language as "en" | "ina" | "zh";
  const [isLoading, setIsLoading] = useState(false);
  const [newsData, setNewsData] = useState<
    {
      title: string;
      slug: string;
      image: string;
      published_at: string;
    }[]
  >([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const nPage = Math.ceil(total / recordsPerPage);
  const pages = [...Array(nPage + 1).keys()].slice(1);

  const handleArrowClick = (type: "prev" | "next") => {
    if (type === "prev" && currentPage !== 1) {
      return setCurrentPage(currentPage - 1);
    }
    if (type === "next" && currentPage !== nPage) {
      return setCurrentPage(currentPage + 1);
    }
  };
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const data =
          await client.fetch(`*[_type == "news" && is_published == true && locale == "${curr_lng}"] [${firstIndex}...${lastIndex}] {
          title,
          "slug": slug.current,
          "image": image.asset->url,
          published_at
        }`);
        setIsLoading(false);

        setNewsData(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchNewsTotal = async () => {
      try {
        const newsCount = await client.fetch(
          `count(*[_type == "news" && is_published == true && locale == "${curr_lng}"])`
        );
        setTotal(newsCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNews();
    fetchNewsTotal();
  }, [curr_lng, currentPage]);
  if (isLoading) return <Loading />;
  return (
    <section id="me">
      <PageContainer>
        <PageTitle title={t("news")} subtitle={t("news_subtitle")} />
        <div className="pb-[60px] flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {newsData.map((item) => {
              return (
                <Link
                  to={`/news/${item.slug}`}
                  className="bg-white rounded-lg shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[200px] object-cover rounded-t-lg"
                  />
                  <div className="rounded-b-lg px-4 py-2.5 flex flex-col gap-4">
                    <h5 className="text-dark font-bold text-xl line-clamp-2">
                      {item.title}
                    </h5>
                    <p className="text-sm text-dark_40">
                      {dayjs(item.published_at).format("YYYY-MM-DD")}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <Pagination
            data={pages}
            currentPage={currentPage}
            onArrowClick={handleArrowClick}
            onPageClick={handlePageClick}
          />
        </div>
      </PageContainer>
    </section>
  );
}
