import CommaUpIcon from "../../../assets/Img/Story/CommaUp.svg";
import CommaDownIcon from "../../../assets/Img/Story/CommaDown.svg";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client } from "../../../lib/sanity";
import { StoryPropsType } from "./VolunteerStory";

export default function BeneficiaryStory() {
  const { t, i18n } = useTranslation();
  const curr_lng = i18n.language as "en" | "ina" | "zh";
  const [story, setStory] = useState<StoryPropsType | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "story" && type == 'Beneficiary'][0] {
                    "title": title.${curr_lng},
                    "image": image.asset->url,
                    "intro": intro.${curr_lng},
                    auther,
                    position
                  }`
        );
        setStory(data);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      }
    };
    fetchStory();
  }, [curr_lng]);

  console.log(story);
  return (
    <div id="beneficiary-story">
      <div>
        <h2 className="text-center mb-4 font-bold text-lg">
          {t("beneficiary_story")}
        </h2>
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
          <img
            src={story?.image}
            alt="volunteer"
            className="w-full object-cover mb-4 aspect-video"
          />
          <div className="">
            <div className="w-6 h-6 mb-4">
              <CommaUpIcon />
            </div>
            <h3 className="mb-4 text-lg font-semibold">{story?.title}</h3>
            <p className="text-base">{story?.intro}</p>
            <div className="h-6 mt-4 w-full flex justify-end">
              <CommaDownIcon />
            </div>
            <div className="mt-4 text-sm text-neutral-700">
              <p className="font-bold">{story?.auther}</p>
              <p>{story?.position}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
