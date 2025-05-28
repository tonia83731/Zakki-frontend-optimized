/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "../lib/sanity";
import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageContainer from "../components/common/PageContainer";
import { FaDonate } from "react-icons/fa";
import { MdVolunteerActivism } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import dayjs from "dayjs";
import DonateModal, {
  DonateInputType,
} from "../components/Main/Program/DonateModal";
import Swal from "sweetalert2";

type ProgramType = {
  team: {
    _id: string;
    name: string;
    image: string;
    position: string;
    contact: {
      icon: string;
      link: string;
    }[];
  }[];
  created_at: string;
  title: string;
  intro: string;
  slug: string;
  image: string;
  multi_img: boolean;
  images: {
    src: string;
  }[];
  target: {
    volunteer: number;
    beneficiary: number;
    progress: number;
    donar: number;
    goal: number;
  };
  _id: string;
};

type EventType = {
  title: string;
  slug: string;
  image: string;
  date: {
    date: string;
    duration: {
      start: string;
      end: string;
    };
  };
  location: string;
};

export default function ProgramPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const curr_lng = i18n.language as "en" | "ina" | "zh";
  const [programData, setProgramData] = useState<ProgramType | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [eventsData, setEventsData] = useState<EventType[]>([]);
  const [modalToggle, setModalToggle] = useState({
    status: false,
    text: "",
  });
  const [donateValue, setDonateValue] = useState({
    fullName: "",
    email: "",
    price: 0,
  });
  const [currentImg, setCurrentImg] = useState("");

  const handleDonationToggle = (title: string) => {
    setModalToggle({
      status: true,
      text: title,
    });
  };

  const handleDonateInputChange = (name: keyof DonateInputType, value: any) => {
    setDonateValue((prev) => ({ ...prev, [name]: [value] }));
  };

  const handleDonateCancel = () => {
    setDonateValue({
      fullName: "",
      email: "",
      price: 0,
    });
    setModalToggle({
      status: false,
      text: "",
    });
  };
  const handleDonateSubmit = () => {
    Swal.fire({
      title: `${t("donate_submit")}`,
      text: `${t("donate_submit_sub")}`,
      icon: "success",
      confirmButtonText: `${t("form_success_btn")}`,
    });
    handleDonateCancel();
  };
  const handleImgClick = (src: string | undefined) => {
    if (src) setCurrentImg(src);
  };

  useEffect(() => {
    const fetchProgram = async () => {
      const data = await client.fetch(`*[
          _type == "programs"
          && slug.current == "${slug}"
          && is_published == true
        ][0]{
        _id,
        "title": title.${curr_lng},
        "intro": intro.${curr_lng},
        "slug": slug.current,
        "image": image.asset->url,
        multi_img,
        images[] {
          "src": image.asset->url,
        },
        target,
        team[]->{
          _id,
          name,
          "image": image.asset->url,
          "position": member_position->title.${curr_lng},
          "contact": member_contact[]{
            "icon": icon->icon.asset->url,
            link
          }
        },
        created_at,
        _id
      }`);
      setProgramData(data);
      setCurrentImg(data.image);
      // console.log(data);
      if (data?.target) {
        const progress = (data?.target.progress / data?.target.goal) * 100;
        const formate_progress = Math.floor(progress || 0);
        setProgress(formate_progress);
      }
    };
    const fetchProgramEvents = async () => {
      try {
        const data = await client.fetch(`
          *[_type == 'event' && resource->slug.current == "${slug}" && is_published == true] {
            "title": title.${curr_lng},
            "slug": slug.current,
            "image": image.asset->url,
            "date": date[0],
            "location": location.${curr_lng}
          }
          `);
        setEventsData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProgram();
    fetchProgramEvents();
  }, [slug, curr_lng]);

  return (
    <PageContainer>
      <section
        className="py-[60px] md:grid sm:grid-cols-[1fr_200px] lg:grid-cols-[1fr_300px] gap-8 relative"
        id="program"
      >
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 text-dark_60 text-xs md:text-base">
            <Link to="/programs" className="hover:font-medium hover:underline">
              {t("nav_programs")}
            </Link>
            <p>/</p>
            <Link
              to={`/programs/${slug}`}
              className="hover:font-medium underline"
            >
              {programData?.title}
            </Link>
          </div>
          {/* image */}
          <div className="grid grid-cols-[2fr_120px] gap-4">
            <img
              src={currentImg}
              alt={`${programData?.title}-main`}
              className="w-full h-full object-cover"
            />
            <div className="flex flex-col gap-4 overflow-y-auto h-full">
              <button
                className="w-[120px] h-[120px] opacity-60"
                onClick={() => handleImgClick(programData?.image)}
              >
                <img
                  src={programData?.image}
                  alt={`${programData?.title}-main`}
                  className="w-full h-full object-cover"
                />
              </button>
              {programData?.multi_img &&
                programData.images.length > 0 &&
                programData.images.map(
                  ({ src }: { src: string }, index: number) => {
                    return (
                      <button
                        className="w-[120px] h-[120px] opacity-60"
                        key={`${programData?.title}-sub-${index}`}
                        onClick={() => handleImgClick(src)}
                      >
                        <img
                          src={src}
                          alt={`${programData?.title}-sub-${index}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  }
                )}
            </div>
          </div>
          {/* title & intro */}
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">{programData?.title}</h1>
            <p className="text-sm md:text-base">
              &nbsp;&nbsp;{programData?.intro}
            </p>
          </div>
          {/* donate card */}
          <div className="flex flex-col items-center gap-4 border-2 border-primary rounded-md p-4 md:hidden">
            <div className="font-bold w-full truncate">
              No.${programData?._id}
            </div>
            {/* progress */}
            <div className="w-full flex flex-col gap-1 items-start text-sm">
              <p>
                {t("target")}: Rp {programData?.target.goal}
              </p>
              <div className="w-full flex items-center gap-4">
                <div className="w-full h-3 bg-slate-200 rounded-full relative">
                  <div
                    className="bg-primary w-full h-3 rounded-full top-0 left-0"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="">{progress}%</p>
              </div>
            </div>
            <div className="w-full text-green-800">
              <div className="flex justify-between items-start gap-6 w-[80%] mx-auto">
                <div className="flex flex-col gap-1 items-center">
                  <FaDonate className="text-4xl md:text-6xl" />
                  <p className="fong-bold text-2xl">
                    {programData?.target.donar}
                  </p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <MdVolunteerActivism className="text-4xl md:text-6xl" />
                  <p className="fong-bold text-2xl">
                    {programData?.target.volunteer}
                  </p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <FaUsersLine className="text-4xl md:text-6xl" />
                  <p className="fong-bold text-2xl">
                    {programData?.target.beneficiary}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDonationToggle(programData?.title as string)}
              className="bg-primary text-white w-full py-1 rounded-md hover:bg-green-800 hover:shadow-md"
            >
              {t("donate")}
            </button>
          </div>
          {/* teams */}
          <div className="flex flex-col gap-4 h-full">
            <h1 className="font-bold text-xl">{t("team")}</h1>
            <>
              {programData && programData?.team.length > 0 ? (
                <>
                  <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-3">
                    {programData?.team.map((item) => {
                      return (
                        <div
                          className="bg-white rounded-t-md w-full h-full hover:shadow-md"
                          key={item.name}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="rounded-t-md w-full h-[250px] object-cover"
                          />
                          <div className="flex flex-col gap-1 px-2 py-1">
                            <div>
                              <h5 className="font-bold text-lg">{item.name}</h5>
                              <p className="text-sm text-dark_60">
                                {item.position}
                              </p>
                            </div>
                            <div className="flex items-center justify-start gap-2">
                              {item.contact.map((data, index) => {
                                // console.log(data.social);
                                return (
                                  <a href={data.link} className="">
                                    <img
                                      src={data.icon}
                                      alt={`${item.name}-social-${index}`}
                                      className="w-6 h-6 object-contain"
                                    />
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="w-full py-4 text-center text-dark_60">
                  {t("no_content")}
                </div>
              )}
            </>
          </div>
          {/* events */}
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-xl">{t("relate_event")}</h1>
            {eventsData.length > 0 ? (
              <>
                <div className="w-full flex flex-col gap-2">
                  {eventsData.map((item, index) => {
                    return (
                      <div
                        key={item.slug}
                        className={`sm:grid sm:grid-cols-[120px_1fr] sm:gap-4 w-full ${
                          index !== 0 &&
                          "border-t border-slate-300 py-1 sm:border-0 sm:py-0"
                        } hover:shadow-md`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-[120px] h-[120px] aspect-square object-cover rounded-sm hidden sm:block"
                        />
                        <div className="flex flex-col justify-between py-2 pr-4">
                          <div className="flex flex-col gap-1">
                            <h5 className="font-bold text-lg truncate w-full">
                              {item.title}
                            </h5>
                            <div className="text-xs text-green-800 flex flex-col gap-0.5">
                              <div className="flex items-center gap-1">
                                <FaLocationDot />
                                <p className="w-fit truncate">
                                  {item.location}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <IoIosTime />
                                <p className="w-fit truncate">
                                  {dayjs(item.date?.date).format("YYYY-MM-DD")}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="w-full flex justify-end">
                            <Link
                              to={`/events/${item.slug}`}
                              className="w-fit px-4 py-1 bg-primary text-white rounded-md hover:shadow-lg"
                            >
                              {t("view_event")}
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="w-full py-4 text-center text-dark_60">
                {t("no_content")}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:grid md:grid-cols-2 md:gap-4">
            <Link
              to="/events"
              className="w-full py-1 text-center fond-medium border-2 border-green-800 rounded-md text-green-800 hover:bg-green-800 hover:text-white"
            >
              {t("more_event")}
            </Link>
            <Link
              to="/joinus"
              className="w-full py-1 text-center fond-medium border-2 border-green-800 rounded-md text-green-800 hover:bg-green-800 hover:text-white"
            >
              {t("join_us")}
            </Link>
          </div>
        </div>
        {/* donate card */}
        <div className="sticky h-fit w-[200px] lg:w-[300px] top-[120px] right-0 hidden md:flex flex-col items-center gap-4 border-2 border-primary rounded-md p-4">
          <div className="font-bold w-full truncate">
            No.${programData?._id}
          </div>
          {/* progress */}
          <div className="w-full flex flex-col gap-1 items-start text-sm">
            <p>
              {t("target")}: Rp {programData?.target.goal}
            </p>
            <div className="w-full flex items-center gap-4">
              <div className="w-full h-3 bg-slate-200 rounded-full relative">
                <div
                  className="bg-primary w-full h-3 rounded-full top-0 left-0"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="">{progress}%</p>
            </div>
          </div>
          <div className="w-full text-green-800">
            <div className="flex justify-between items-start gap-6 md:flex-col md:gap-4 md:justify-center md:items-center w-[80%] mx-auto">
              <div className="flex flex-col gap-1 items-center">
                <FaDonate className="text-4xl md:text-6xl" />
                <p className="fong-bold text-2xl">
                  {programData?.target.donar}
                </p>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <MdVolunteerActivism className="text-4xl md:text-6xl" />
                <p className="fong-bold text-2xl">
                  {programData?.target.volunteer}
                </p>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <FaUsersLine className="text-4xl md:text-6xl" />
                <p className="fong-bold text-2xl">
                  {programData?.target.beneficiary}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleDonationToggle(programData?.title as string)}
            className="bg-primary text-white w-full py-1 rounded-md hover:bg-green-800 hover:shadow-md"
          >
            {t("donate")}
          </button>
        </div>
      </section>
      {modalToggle.status && (
        <DonateModal
          onModalClose={handleDonateCancel}
          title={modalToggle.text}
          inputValue={donateValue}
          onInputChange={handleDonateInputChange}
          onDonateCancel={handleDonateCancel}
          onDonateSubmit={handleDonateSubmit}
        />
      )}
    </PageContainer>
  );
}
