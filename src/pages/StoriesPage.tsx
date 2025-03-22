import { PageTitle } from "../components/common/PageTitle";
import Subscribe from "../components/Main/Subscribe";
import PageContainer from "../components/common/PageContainer";
import VolunteerStory from "../components/Main/Stories/VolunteerStory";
import BeneficiaryStory from "../components/Main/Stories/BeneficiaryStory";
import { useTranslation } from "react-i18next";

export default function StoriesPage() {
  const { t } = useTranslation();
  return (
    <main>
      <section id="stories">
        <PageContainer>
          <PageTitle title={t("story")} subtitle={t("story_subtitle")} />
          <div>
            <BeneficiaryStory />
            <div className="py-4"></div>
            <VolunteerStory />
          </div>
        </PageContainer>
      </section>
      <Subscribe />
    </main>
  );
}
