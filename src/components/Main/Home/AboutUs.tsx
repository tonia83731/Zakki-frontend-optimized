import { useTranslation } from "react-i18next";
import PageContainer from "../../common/PageContainer";
import ElderlyIcon from "../../../assets/Img/Home/elderly.svg";
import CommunityIcon from "../../../assets/Img/Home/community.svg";
import DisabledIcon from "../../../assets/Img/Home/disabled.svg";

export default function AboutUs() {
  const { t } = useTranslation();

  const diagrams = [
    {
      id: 1,
      diagram: <ElderlyIcon />,
      title: `${t("about_elderly")}`,
    },
    {
      id: 2,
      diagram: <CommunityIcon />,
      title: `${t("about_community")}`,
    },
    {
      id: 3,
      diagram: <DisabledIcon />,
      title: `${t("about_disabled")}`,
    },
  ];

  return (
    <section id="about-us">
      <PageContainer>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 items-center">
            <div className="w-1/2 md:w-1/3 max-w-[300px] mx-auto pb-4 border-b-4 border-warning font-poppins font-bold text-xl text-dark text-center">
              {t("about")}
            </div>
            <div className="font-semibold text-base text-center md:hidden">
              {t("about_description")}
            </div>
          </div>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:items-center">
            <div className="flex flex-col gap-2">
              <div className="font-semibold hidden md:block">
                {t("about_description")}
              </div>
              <div className="flex justify-between items-start">
                {diagrams.map((item) => {
                  return (
                    <div
                      className="w-1/3 flex flex-col gap-1 items-center"
                      key={item.title}
                    >
                      {item.diagram}
                      <p className="text-sm text-center">{item.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <iframe
              src="https://www.youtube.com/embed/DWv-lACT9cc?si=LuWBD2644gGSLppS"
              title="YouTube video player"
              // frameborder="0"
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              // allowfullscreen
            ></iframe>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
