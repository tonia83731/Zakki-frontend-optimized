import { PageTitle } from "../components/common/PageTitle";
import PageContainer from "../components/common/PageContainer";
import { Pagination } from "../components/common/Pagination";
import Search from "../components/Main/Program/Search";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import dayjs from "dayjs";

import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client } from "../lib/sanity";
import { Link } from "react-router-dom";

type DefaultEventProps = {
  title: string;
  slug: string;
  date: {
    date: string;
    duration: {
      start: string;
      end: string;
    };
  };
  location: string;
};

type RecommendEventProps = DefaultEventProps & {
  image: string;
};

export default function EventsPage() {
  const { t, i18n } = useTranslation();
  const curr_lng = i18n.language as "en" | "ina" | "zh";
  const [recommendEvent, setRecommendEvent] = useState<RecommendEventProps[]>(
    []
  );
  const [eventData, setEventData] = useState<DefaultEventProps[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [defaultValue, setDefaultValue] = useState("New");
  const [searchValue, setSearchValue] = useState("");
  const recordsPerPage = 6;
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
      const data =
        await client.fetch(`*[_type == "event" && isRecommended != true && isPublished == true && title.${curr_lng} match "${searchValue}*"] | order(date[0].date ${updated_order}, order asc) [${firstIndex}...${lastIndex}] {
          "title": title.${curr_lng},
          "slug": slug.current,
          "date": date[0],
          "location": location.${curr_lng}
        }`);

      const totals = await client.fetch(
        `count(*[_type == "event" && isRecommended != true && isPublished == true && title.${curr_lng} match "${searchValue}*"])`
      );
      setEventData(data);
      setCurrentPage(1);
      setTotal(totals);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchKeyDown = async () => {
    if (searchValue.length === 0) return;
    const updated_order = defaultValue === "New" ? "desc" : "asc";
    try {
      const data =
        await client.fetch(`*[_type == "event" && isRecommended != true && isPublished == true && title.${curr_lng} match "${searchValue}*"] | order(date[0].date ${updated_order}, order asc) [${firstIndex}...${lastIndex}] {
          "title": title.${curr_lng},
          "slug": slug.current,
          "date": date[0],
          "location": location.${curr_lng}
        }`);

      const totals = await client.fetch(
        `count(*[_type == "event" && isRecommended != true && isPublished == true && title.${curr_lng} match "${searchValue}*"])`
      );
      setEventData(data);
      setCurrentPage(1);
      setTotal(totals);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchClear = () => {
    setSearchValue("");
  };
  const handleEventFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDefaultValue(value);
  };

  useEffect(() => {
    const updated_order = defaultValue === "New" ? "desc" : "asc";
    const fetchRecommendEvent = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "event" && isRecommended == true && isPublished == true] | order(date[0].date ${updated_order}, order asc) {
                    "title": title.${curr_lng},
                    "slug": slug.current,
                    "image": image.asset->url,
                    "date": date[0],
                    "location": location.${curr_lng}
                  }`
        );
        setRecommendEvent(data);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      }
    };
    fetchRecommendEvent();
  }, [curr_lng, defaultValue]);

  useEffect(() => {
    if (searchValue.length > 0) return;
    const updated_order = defaultValue === "New" ? "desc" : "asc";
    const fetchEvents = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "event" && isPublished == true] | order(date[0].date ${updated_order}, order asc) [${firstIndex}...${lastIndex}] {
                    "title": title.${curr_lng},
                    "slug": slug.current,
                    "date": date[0],
                    "location": location.${curr_lng}
                  }`
        );
        setEventData(data);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      }
    };

    const fetchEventTotal = async () => {
      try {
        const programCount = await client.fetch(
          `count(*[_type == "event" && isRecommended != true && isPublished == true])`
        );
        setTotal(programCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
    fetchEventTotal();
  }, [curr_lng, currentPage, defaultValue, searchValue]);
  return (
    <main>
      <PageContainer>
        <section id="events" className="py-[60px]">
          <PageTitle title={t("event")} subtitle={t("event_subtitle")} />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-xl">{t("recommend_event")}</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recommendEvent.map((event) => {
                  return (
                    <div className="w-full">
                      <img
                        src={event.image}
                        alt={`event-${event.slug}`}
                        className="w-full h-[200px] object-cover"
                      />
                      <div className="px-2 py-1">
                        <h5 className="font-bold text-lg w-full h-[56px] line-clamp-2">
                          {event.title}
                        </h5>
                        <div className="flex items-center gap-1">
                          <IoIosTime />
                          <p className="w-fit truncate">
                            {dayjs(event.date?.date).format("YYYY-MM-DD")}{" "}
                            {event.date.duration.start}~
                            {event.date.duration.end}
                          </p>
                        </div>
                        <div className="w-full flex justify-end">
                          <Link
                            to={`/events/${event.slug}`}
                            className="px-4 py-1 bg-primary text-white hover:shadow-md rounded-md"
                          >
                            {t("more")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Search
                defaultValue={defaultValue}
                searchValue={searchValue}
                onSearchChange={handleSearchChange}
                onSearchClick={handleSearchClick}
                onSearchKeyDown={handleSearchKeyDown}
                onFilterChange={handleEventFilterChange}
                onSearchClear={handleSearchClear}
              />

              <div>
                {eventData.map((event, index) => {
                  return (
                    <Link
                      to={`/event/${event.slug}`}
                      className={`flex flex-col gap-2 py-1 bg-white hover:bg-primary_20 hover:px-4 ${
                        index !== 0 &&
                        "border-t-2 border-green-800 border-dotted"
                      }`}
                    >
                      <h5 className="font-bold text-lg w-full truncate">
                        {event.title}
                      </h5>
                      <div className="flex flex-col gap-1 text-xs md:text-sm md:grid md:grid-cols-[1fr_2fr] text-green-800">
                        <div className="flex items-center gap-1">
                          <IoIosTime />
                          <p className="w-fit truncate">
                            {dayjs(event.date?.date).format("YYYY-MM-DD")}{" "}
                            {event.date.duration.start}~
                            {event.date.duration.end}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaLocationDot />
                          <p className="w-fit truncate">{event.location}</p>
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
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
