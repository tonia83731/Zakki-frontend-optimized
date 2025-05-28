import Slider from "react-slick"
import { CarouselItemType } from "./HomeCarousel";
import { Link } from "react-router-dom";


export default function HomeCarouselMobile({homeItems}: {
    homeItems: CarouselItemType[]
}) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    return <Slider {...settings}>
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
                <div className="absolute top-0 left-0 bg-black opacity-30 w-full h-full hover:opacity-0"></div>
              </div>
              <div className="absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 w-full px-8 flex flex-col gap-4">
                <h1 className="text-white font-extrabold text-center text-2xl">
                  {item.title}
                </h1>
                <div className="flex justify-center items-center gap-2 font-medium">
                  {item.link.map((item, index) => {
                    return (
                      <Link
                        to={`${item.url}`}
                        key={`home-link-${index}`}
                        className="text-center"
                      >
                        <div className="bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-green_hover hover:text-dark">{item.title}</div>
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
}