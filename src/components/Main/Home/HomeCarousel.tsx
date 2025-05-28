import { useState, useEffect } from "react";
import { client } from "../../../lib/sanity";
import { useTranslation } from "react-i18next";
import HomeCarouselMobile from "./HomeCarouselMobile";
import HomeCarouselDesktop from "./HomeCarouselDesktop";

export type LangOpt = {
  en: string;
  ina: string;
  zh: string;
};
export type CarouselItemType = {
  title: string;
  tag?: string;
  image: string;
  link: {
    title: string;
    url: string;
  }[];
};

export default function HomeCarousel() {
  const [homeItems, setHomeItems] = useState<CarouselItemType[]>([]);
  const { i18n } = useTranslation();
  // console.log(i18n.language);
  const curr_lng = i18n.language as "en" | "ina" | "zh";
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "home" && isPublished == true] | order(orderRank){
            "title": title.${curr_lng},
            tag,
            "image": image.asset->url,
            link[]{
              "title": guide.title.${curr_lng},
              "url": guide.url
            },
            order
          }`
        );

        setHomeItems(data);
        // console.log(data);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      }
    };

    fetchHome();
  }, [curr_lng]);

  return (
    <>
    <div className="lg:hidden mt-12">
      <HomeCarouselMobile homeItems={homeItems}/>
    </div>
    <div className="hidden lg:block lg:mt-16">
      <HomeCarouselDesktop homeItems={homeItems}/>
    </div>
    </>
  );
}

// const CarouselBtn = styled.div`
//   padding: 0 0.5rem;
//   width: 100%;
//   min-height: 30px;
//   line-height: 25px;
//   color: ${colorList.white};
//   background-color: ${colorList.primary};
//   border-radius: 5px;
//   @media screen and (min-width: ${breakpoints.tablet}) {
//     min-width: 205px;
//     min-height: 45px;
//     line-height: 40px;
//   }
// `;
