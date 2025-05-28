import { Link } from "react-router-dom";
import { CarouselItemType } from "./HomeCarousel";
import Slider from "react-slick";

export default function HomeCarouselDesktop({homeItems}: {
    homeItems: CarouselItemType[]
}) {

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //   };

    const settings = {
        className: "slider variable-width",
        centerMode: true,
        variableWidth: true,
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
      };

    return <Slider {...settings}>
        {homeItems.map((item) => {
            return (
                <div key={item.title} className="px-4 mx-auto slide-wrapper transition-opacity duration-300" style={{ width: 900 }}>
                    <div className="relative">
                        <div className="w-full h-full max-h-[500px]">
                            <img
                            src={item.image}
                            alt={item.title}
                            className="w-full object-cover object-top h-full max-h-[500px]"
                            />
                            <div className="absolute top-0 left-0 bg-black opacity-30 md:opacity-30 w-full h-full max-h-[500px] hover:opacity-0"></div>
                        </div>
                        <div className="absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%] flex flex-col items-center gap-8">
                            <h1 className="text-white font-extrabold text-center text-2xl md:text-4xl">
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