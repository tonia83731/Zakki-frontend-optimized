import { useTranslation } from "react-i18next";
import PageContainer from "../components/common/PageContainer";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../lib/sanity";
import EventToggle from "../components/Main/Event/EventToggle";
import Slider from "react-slick";
import EventRecommendCard from "../components/Main/Event/EventCommentCard";
import { MdDomain } from "react-icons/md";

type EventProps = {
  _id: string;
  title: string;
  intro: string;
  slug: string;
  image: string;
  apply_url: string;
  date: {
    date: string;
    duration: {
      start: string;
      end: string;
    };
  }[];
  resource: {
    title: string;
    slug: string;
  };
  location: string;
  faq: {
    question: string;
    answer: string;
  }[];
  past: {
    content: string;
  }[];
};

export default function EventPage() {
  const { slug } = useParams<{ slug: string }>();
  // console.log(slug);
  const { t, i18n } = useTranslation();
  const curr_lng = i18n.language as "en" | "ina" | "zh";

  const [eventData, setEventData] = useState<EventProps | null>(null);
  const [dateSelect, setDateSelect] = useState<
    { label: string; value: string }[]
  >([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await client.fetch(`*[
                  _type == "event"
                  && slug.current == "${slug}"
                  && is_published == true
                ][0]{
                  _id,
                  "title": title.${curr_lng},
                  "intro": intro.${curr_lng},
                  "slug": slug.current,
                  "image": image.asset->url,
                  "resource": resource->{
                    "title": title.${curr_lng},
                    slug
                  },
                  apply_url,
                  date[] {
                    "date": item.date,
                    "start": item.duration.start,
                    "end": item.duration.end,
                  },
                  "location": location.${curr_lng},
                  faq[] {
                    "question": items.question.${curr_lng},
                    "answer": items.answer.${curr_lng}
                  },
                  past[] {
                    "content": content
                  }
                }`);
        setEventData(data);
        console.log(data);
        const dates =
          data.date.length > 0
            ? data.date.map(
                (d: { date: string; start: string; end: string }) => ({
                  label: `${d.date} ${d.start} ~ ${d.end}`,
                  value: `${d.date} ${d.start} ~ ${d.end}`,
                })
              )
            : [];
        setDateSelect(dates);

        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvent();
  }, [slug, curr_lng]);

  // console.log(eventData);

  return (
    <section className="pt-[45px] md:pt-[60px] pb-[60px]" id="event">
      <div className="bg-white shadow-lg rounded-b-[15px] md:rounded-b-[45px] pb-[60px]">
        <div className="flex flex-col gap-8 w-[90%] mx-auto">
          <div className="pt-[60px] flex items-center gap-2 text-dark_60 text-xs md:text-base">
            <Link to="/events" className="hover:font-medium hover:underline">
              {t("nav_events")}
            </Link>
            <p>/</p>
            <Link
              to={`/events/${slug}`}
              className="hover:font-medium underline truncate"
            >
              {eventData?.title}
            </Link>
          </div>
          <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:gap-8">
            <img
              src={eventData?.image}
              alt={eventData?.title}
              className="w-full h-auto object-cover"
            />
            <div className="flex flex-col gap-4 md:justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-2xl">{eventData?.title}</h1>
                <p className="text-sm md:text-base">
                  &nbsp;&nbsp;{eventData?.intro}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  name={`event-${eventData?.slug}-date`}
                  id={`event-${eventData?.slug}-date`}
                  className="w-full form-input"
                >
                  {dateSelect.map((d) => {
                    return (
                      <option key={d.value} value={d.value} className="">
                        {d.label}
                      </option>
                    );
                  })}
                </select>
                <a
                  target="_blank"
                  href={eventData?.apply_url}
                  className="px-4 py-2 bg-primary hover:bg-green-800 text-white rounded-md"
                >
                  {t("apply")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageContainer>
        <div className="flex flex-col gap-8">
          {/* relation */}
          <div className="flex items-center gap-2 text-primary">
            <MdDomain />
            <Link to={`/program/${eventData?.resource.slug}`}>
              From Program{" "}
              <span className="font-bold">{eventData?.resource.title}</span>
            </Link>
          </div>
          {/* faq */}
          <div className="bg-white shadow-lg rounded-xl">
            <h5 className="font-bold text-xl py-2 px-4 border-b border-l-slate-300">
              {t("faq")}
            </h5>
            <div className="px-4 py-2">
              {eventData?.faq.map(({ question, answer }, index) => {
                return (
                  <EventToggle
                    key={`question-${index}`}
                    question={question}
                    answer={answer}
                  />
                );
              })}
            </div>
          </div>
          {/* past event */}
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-xl px-4">{t("past_comment")}</h5>
            <div>
              {!eventData || !eventData.past ? (
                <div className="w-full text-center text-dark_60 py-2">
                  {t("no_content")}
                </div>
              ) : eventData.past.length === 1 ? (
                <div className="bg-primary_20 text-green-800 shadow-lg rounded-lg px-4 py-4 h-full flex items-center">
                  {eventData.past.map((item, index) => {
                    return (
                      <EventRecommendCard
                        index={index}
                        comment={item.content}
                        key={`event-${index}`}
                      />
                    );
                  })}
                </div>
              ) : (
                <Slider
                  {...settings}
                  className="bg-primary_20 text-green-800 shadow-lg rounded-lg px-4 py-4 h-full flex items-center"
                >
                  {eventData.past.map((item, index) => {
                    return (
                      <EventRecommendCard
                        key={`event-${index}`}
                        index={index}
                        comment={item.content}
                      />
                    );
                  })}
                </Slider>
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
