import HomeCarousel from "../components/Main/Home/HomeCarousel";
import AboutUs from "../components/Main/Home/AboutUs";
import Subscribe from "../components/Main/Subscribe";

export default function HomePage() {
  return (
    <>
      <section className="pt-[45px] md:pt-[60px]" id="home-carousel">
        <HomeCarousel />
      </section>
      <AboutUs />
      <Subscribe />
    </>
  );
}
