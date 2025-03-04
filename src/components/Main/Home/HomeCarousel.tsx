import { styled } from "styled-components";
import { colorList } from "../../../styles/ColorSettings";
import { useState, useEffect } from "react";
import { client } from "../../../lib/sanity";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { breakpoints } from "../../../styles/Breakpoints";
// import HomeCarouselItemSwitch from "./HomeCarouselItemSwitch";
export type LangOpt = {
  en: string;
  ina: string;
  zh: string;
};
type CarouselItemType = {
  title: string;
  tag?: string;
  image: string;
  link: {
    title: {
      en: string;
      ina: string;
      zh: string;
    };
    url: string;
  }[];
};

export default function HomeCarousel() {
  const [homeItems, setHomeItems] = useState<CarouselItemType[]>([]);
  const { i18n } = useTranslation();
  // console.log(i18n.language);
  const curr_lng = i18n.language as "en" | "ina" | "zh";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "home" && isPublished == true] | order(order asc){
            "title": title.${curr_lng},
            tag,
            "image": image.asset->url,
            link,
            order
          }`
        );
        setHomeItems(data);
        console.log(data);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      }
    };

    fetchHome();
  }, [curr_lng]);

  return (
    <Slider {...settings}>
      {homeItems.map((item) => {
        return (
          <div className="max-w-screen overflow-x-hidden">
            <div className="relative w-full aspect-video">
              <div className="">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-video object-cover object-top"
                />
                <div className="absolute top-0 left-0 bg-black opacity-30 md:opacity-30 w-full h-full hover:opacity-0"></div>
              </div>
              <div className="absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 md:right-0 md:translate-x-0 w-full md:w-3/5 px-8 flex flex-col gap-4">
                <h1 className="text-white font-extrabold text-center text-2xl md:text-start md:text-4xl">
                  {item.title}
                </h1>
                <div className="flex justify-center items-center gap-2 font-medium md:justify-start">
                  {item.link.map((item, index) => {
                    return (
                      <Link
                        to={`${item.url}`}
                        key={`home-link-${index}`}
                        className="text-center"
                      >
                        <CarouselBtn>{item.title[curr_lng]}</CarouselBtn>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
}

const CarouselBtn = styled.div`
  padding: 0 0.5rem;
  width: 100%;
  min-height: 30px;
  line-height: 25px;
  color: ${colorList.white};
  background-color: ${colorList.primary};
  border-radius: 5px;
  @media screen and (min-width: ${breakpoints.tablet}) {
    min-width: 205px;
    min-height: 45px;
    line-height: 40px;
  }
`;
