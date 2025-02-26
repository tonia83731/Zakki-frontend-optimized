/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client } from "../lib/sanity";
import PageContainer from "../components/common/PageContainer";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import JobModal from "../components/Main/JoinUs/JobModal";
import JobCard from "../components/Main/JoinUs/JobCard";
import JobInfoForm from "../components/Main/JoinUs/Form/JobInfoForm";
import CommentForm from "../components/Main/JoinUs/Form/CommentForm";
import BasicInfoForm from "../components/Main/JoinUs/Form/BasicInfoForm";
import { useFormContext } from "../context/formContext";

export type JobItemType = {
  _id: string;
  title: string;
  image: string;
  location: string;
  duration: number;
};

export default function JoinUsPage() {
  const { t, i18n } = useTranslation();
  const curr_lng = i18n.language as "en" | "ina" | "zh";
  const {
    currStep,
    handleStepChange,
    basicDisabled,
    jobDisabled,
    formLoading,
    handleInputChange,
    handleFormSubmit,
  } = useFormContext();
  const [jobsData, setJobsData] = useState<JobItemType[]>([]);
  const [selectedJob, setSelectedJob] = useState({
    id: "",
    title: "",
  });
  const [modalToggle, setModalToggle] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  // const [currStep, setCurrStep] = useState(0);

  const steps = [
    `${t("form_basic")}`,
    `${t("form_job")}`,
    `${t("form_other")}`,
  ];

  const handleInfoClick = async (e: any, id: string) => {
    e.stopPropagation();
    try {
      const data = await client.fetch(
        `*[_type == "jobs" && _id == "${id}"][0] {
          "requirement": requirement.${curr_lng}}`
      );
      setModalContent(data.requirement);
      setModalToggle(true);
    } catch (error) {
      console.log("Sanity fetch error:", error);
    }
  };
  const handleModalClose = () => {
    setModalContent(null);
    setModalToggle(false);
  };

  const handleJobSelect = (_id: string, title: string) => {
    setSelectedJob({
      id: _id,
      title,
    });
    handleInputChange("job", "job", title);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "jobs" && isPublished == true] {
          _id,
                            "title": title.${curr_lng},
                            "image": image.asset->url,
                            location,
                            duration,
                          }`
        );

        setJobsData(data);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      }
    };
    fetchJobs();
  }, [curr_lng]);

  const curr_form: Record<number, JSX.Element> = {
    0: <BasicInfoForm />,
    1: <JobInfoForm jobSelect={selectedJob.title} />,
    2: <CommentForm />,
  };

  return (
    <PageContainer>
      <section
        id="join-us"
        className="py-[60px] flex flex-col gap-8 lg:grid lg:grid-cols-[300px_1fr]"
      >
        <div className="h-[240px] flex flex-nowrap items-center gap-4 w-full overflow-x-auto lg:flex-col lg:justify-center lg:items-center lg:h-full lg:max-h-[550px] lg:w-[300px] lg:overflow-x-hidden lg:overflow-y-auto">
          {jobsData.map((job) => {
            return (
              <JobCard
                _id={job._id}
                key={job._id}
                title={job.title}
                image={job.image}
                location={job.location}
                duration={job.duration}
                selectedJob={selectedJob}
                onInfoClick={handleInfoClick}
                onJobSelect={handleJobSelect}
              />
            );
          })}
        </div>
        <form
          className="flex flex-col gap-6 lg:justify-between lg:max-h-[550px]"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col gap-6">
            <div className="w-[90%] mx-auto max-w-[600px] flex justify-between items-center">
              {steps.map((step, index) => {
                return (
                  <div className="flex flex-col gap-2 items-center">
                    <div
                      className={`w-10 h-10 flex justify-center items-center text-lg rounded-full border-2 ${
                        currStep >= index
                          ? "border-primary text-primary"
                          : "border-slate-300 text-slate-300"
                      }`}
                    >
                      {currStep > index ? (
                        <IoCheckmarkDoneSharp />
                      ) : (
                        `${index + 1}`
                      )}
                    </div>
                    <div
                      className={
                        currStep >= index
                          ? "text-primary text-sm font-medium"
                          : "border-slate-50 text-slate-300"
                      }
                    >
                      {step}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-6">
              <div className="text-center font-bold text-lg">
                {t("form_sub")}
              </div>
              {curr_form[currStep]}
            </div>
          </div>
          <div
            className={`flex items-center gap-4 text-white ${
              currStep === 0 ? "justify-end" : "justify-between"
            }`}
          >
            {currStep > 0 && (
              <button
                type="button"
                onClick={() => handleStepChange("prev")}
                className="bg-slate-300 rounded-md px-4 py-1.5 hover:shadow-md hover:bg-neutral_90"
              >
                Prev
              </button>
            )}
            {currStep < 2 && (
              <button
                type="button"
                disabled={
                  (currStep === 0 && basicDisabled) ||
                  (currStep === 1 && jobDisabled)
                }
                onClick={() => handleStepChange("next")}
                className="bg-primary rounded-md px-4 py-1.5 hover:shadow-md hover:bg-green-800 disabled:bg-slate-300"
              >
                Next
              </button>
            )}
            {currStep === 2 && (
              <button
                disabled={formLoading}
                type="submit"
                className="bg-primary rounded-md px-4 py-1.5 hover:shadow-md hover:bg-green-800 disabled:bg-slate-300"
              >
                {formLoading ? "Loading..." : "Submit"}
              </button>
            )}
          </div>
        </form>
      </section>
      {modalToggle && (
        <JobModal
          requirements={modalContent as string}
          onModalClose={handleModalClose}
        />
      )}
    </PageContainer>
  );
}
