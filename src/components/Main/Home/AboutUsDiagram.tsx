import { useTranslation } from "react-i18next";
import ElderlyIcon from "../../../assets/Img/Home/elderly.svg";
import CommunityIcon from "../../../assets/Img/Home/community.svg";
import DisabledIcon from "../../../assets/Img/Home/disabled.svg";

export default function AboutUsDiagram() {
  const { t } = useTranslation();

  const diagramData = [
    {
      id: 1,
      diagram: ElderlyIcon,
      title: `${t("about_elderly")}`,
    },
    {
      id: 2,
      diagram: CommunityIcon,
      title: `${t("about_community")}`,
    },
    {
      id: 3,
      diagram: DisabledIcon,
      title: `${t("about_disabled")}`,
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {diagramData.map((item) => {
        return (
          <div
            className="flex flex-col gap-1 items-center h-full"
            key={item.id}
          >
            <img
              src={item.diagram}
              alt={item.title}
              className="w-[80px] h-[80px]"
            />
            <p>{item.title}</p>
          </div>
        );
      })}
    </div>
  );
}
