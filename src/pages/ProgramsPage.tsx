import dayjs from "dayjs";
import { PageTitle } from "../components/common/PageTitle";
import { Pagination } from "../components/common/Pagination";
import { ChangeEvent, useEffect, useState } from "react";
import { client } from "../lib/sanity";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Search from "../components/Main/Program/Search";
import PageContainer from "../components/common/PageContainer";
import Loading from "../components/common/Loading";

type ProgramItemType = {
  title: string;
  slug: string;
  image: string;
  created_at: string;
};

export default function ProgramsPage() {
  const { t, i18n } = useTranslation();
  const curr_lng = i18n.language as "en" | "ina" | "zh";
  const [isLoading, setIsLoading] = useState(false);
  const [programData, setProgramData] = useState<ProgramItemType[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [defaultValue, setDefaultValue] = useState("New");
  const [searchValue, setSearchValue] = useState("");
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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleSearchClick = async () => {
    if (searchValue.length === 0) return;
    const updated_order = defaultValue === "New" ? "desc" : "asc";
    try {
      setIsLoading(true);
      const data =
        await client.fetch(`*[_type == "program" && isPublished == true && title.${curr_lng} match "${searchValue}*"] | order(created_at ${updated_order}) [${firstIndex}...${lastIndex}] {
          "title": title.${curr_lng},
          "slug": slug.current,
          "image": image.asset->url,
          created_at
        }`);

      const totals = await client.fetch(
        `count(*[_type == "program" && isPublished == true && title.${curr_lng} match "${searchValue}*"])`
      );
      setIsLoading(false);
      setCurrentPage(1);
      setProgramData(data);
      setTotal(totals);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchClear = () => {
    setSearchValue("");
  };
  const handleSearchKeyDown = async () => {
    if (searchValue.length === 0) return;
    const updated_order = defaultValue === "New" ? "desc" : "asc";
    try {
      setIsLoading(true);
      const data =
        await client.fetch(`*[_type == "program" && isPublished == true && title.${curr_lng} match "${searchValue}*"] | order(created_at ${updated_order}) [${firstIndex}...${lastIndex}] {
          "title": title.${curr_lng},
          "slug": slug.current,
          "image": image.asset->url,
          created_at
        }`);

      const totals = await client.fetch(
        `count(*[_type == "program" && isPublished == true && title.${curr_lng} match "${searchValue}*"])`
      );
      setIsLoading(false);
      setCurrentPage(1);
      setProgramData(data);
      setTotal(totals);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProgramFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDefaultValue(value);
  };

  useEffect(() => {
    if (searchValue.length > 0) return;
    const updated_order = defaultValue === "New" ? "desc" : "asc";
    const fetchProgram = async () => {
      try {
        setIsLoading(true);
        const data = await client.fetch(
          `*[_type == "programs" && is_published == true]| order(created_at ${updated_order})[${firstIndex}...${lastIndex}] {
                "title": title.${curr_lng},
                "slug": slug.current,
                "image": image.asset->url,
                created_at
              }`
        );
        setIsLoading(false);
        setProgramData(data);
        // console.log(data);
      } catch (error) {
        setIsLoading(false);
        console.error("Sanity fetch error:", error);
      }
    };
    const fetchProgramTotal = async () => {
      try {
        const totalCount = await client.fetch(
          `count(*[_type == "programs" && is_published == true])`
        );
        setTotal(totalCount);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      }
    };
    fetchProgram();
    fetchProgramTotal();
  }, [curr_lng, currentPage, defaultValue, searchValue]);

  if (isLoading) return <Loading />;
  return (
    <main>
      <PageContainer>
        <section id="programs" className="py-[60px]">
          <PageTitle title={t("program")} subtitle={t("program_subtitle")} />
          <Search
            defaultValue={defaultValue}
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            onSearchClick={handleSearchClick}
            onSearchKeyDown={handleSearchKeyDown}
            onFilterChange={handleProgramFilterChange}
            onSearchClear={handleSearchClear}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {programData.map((item) => {
              return (
                <Link
                  key={item.slug}
                  to={`/programs/${item.slug}`}
                  className="relative overflow-hidden group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 z-50 w-full h-full bg-dark_40 group-hover:bg-dark_20 flex justify-center items-center">
                    <div className="flex flex-col gap-1 items-center text-white">
                      <h1 className="font-bold text-lg md:text-xl text-center">
                        {item.title}
                      </h1>
                      <p className="text-sm">
                        {dayjs(item.created_at).format("YYYY-MM-DD")}
                      </p>
                    </div>
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
        </section>
      </PageContainer>
    </main>
  );
}
