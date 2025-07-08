import HomeCarousel from "../components/Main/Home/HomeCarousel";
import AboutUs from "../components/Main/Home/AboutUs";
import Actions from "../components/Main/Home/Actions";
import Subscribe from "../components/Main/Subscribe";
import LattestNews from "../components/Main/Home/LattestNews";
import VisionAndMission from "../components/Main/Home/VisionAndMission";

export default function HomePage() {
  return (
    <>
      <section className="" id="home-carousel">
        <HomeCarousel />
      </section>
      <AboutUs />
      <Actions />
      <VisionAndMission />
      <LattestNews />
      <br />
      <Subscribe />
    </>
  );
}
