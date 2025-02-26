import { PageTitle } from "../components/common/PageTitle";
import Subscribe from "../components/Main/Subscribe";
import PageContainer from "../components/common/PageContainer";
import VolunteerStory from "../components/Main/Stories/VolunteerStory";
import BeneficiaryStory from "../components/Main/Stories/BeneficiaryStory";

export default function StoriesPage() {
  return (
    <main>
      <section id="stories">
        <PageContainer>
          <PageTitle
            title="Our Stories"
            subtitle="Listen to the beneficiary partner and our volunteers about their ZAKKI participate experience"
          />
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
