/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "../lib/sanity";
import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageContainer from "../components/common/PageContainer";
import { FaDonate } from "react-icons/fa";
import { MdVolunteerActivism } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import EmailIcon from "../assets/Img/social/email.png";
import FacebookIcon from "../assets/Img/social/facebook.png";
import InstagramIcon from "../assets/Img/social/instagram.png";
import LinkedInIcon from "../assets/Img/social/linkedin.png";
import TwitterIcon from "../assets/Img/social/twitter.png";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import dayjs from "dayjs";
import DonateModal, {
  DonateInputType,
} from "../components/Main/Program/DonateModal";
import Swal from "sweetalert2";

type SocialType = "email" | "facebook" | "linkedin" | "instagram" | "twitter";

type ProgramType = {
  _id: string;
  title: string;
  intro: string;
  image: string;
  image2: string;
  image3: string;
  slug: string;
  target: {
    funding: number;
    raised: number;
  };
  team: {
    contact: {
      social: SocialType;
      url: string;
    }[];
    job: string;
    name: string;
    image: string;
  }[];
  volunteer: number;
  donar: number;
  beneficiery: number;
  updatedAt: string;
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

  const socailMatch: Record<SocialType, string> = {
    email: EmailIcon,
    facebook: FacebookIcon,
    linkedin: LinkedInIcon,
    instagram: InstagramIcon,
    twitter: TwitterIcon,
  };

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

  useEffect(() => {
    const fetchProgram = async () => {
      const data = await client.fetch(`*[
          _type == "program"
          && slug.current == "${slug}"
          && isPublished == true
        ][0]{
        _id,
        "title": title.${curr_lng},
          
          "slug": slug.current,
          "image": image.asset->url,
          "image2": image_2.asset->url,
          "image3": image_3.asset->url,
          target,
          donar,
          volunteer,
          beneficiery,
          "team": team[]{
            "image": image.asset->url,
            job,
            name,
            "contact": contact[]{
              social,
              url
            }
          },
          updatedAt
      }`);
      // console.log(data);
      setProgramData(data);
      if (data?.target) {
        const progress = (data?.target.raised / data?.target.funding) * 100;
        const formate_progress = Math.floor(progress || 0);
        setProgress(formate_progress);
      }
    };
    const fetchProgramEvents = async () => {
      try {
        const data = await client.fetch(`
          *[_type == 'event' && relateSlug == "${slug}" && isPublished == true]|order(order asc) {
            "title": title.${curr_lng},
            "slug": slug.current,
            "image": image.asset->url,
            "date": date[0],
            "location": location.${curr_lng}
          }
          `);
        setEventsData(data);
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
            <Link
              to="/Zakki-frontend-optimized/programs"
              className="hover:font-medium hover:underline"
            >
              {t("nav_programs")}
            </Link>
            <p>/</p>
            <Link
              to={`/Zakki-frontend-optimized/programs/${slug}`}
              className="hover:font-medium underline"
            >
              {programData?.title}
            </Link>
          </div>
          {/* image */}
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <img
              src={programData?.image}
              alt={`${programData?.title}-main`}
              className="w-full h-full object-cover"
            />
            <div className="grid grid-rows-2 gap-4">
              <img
                src={programData?.image2}
                alt={`${programData?.title}-side-1`}
                className="w-full h-full object-cover"
              />
              <img
                src={programData?.image3}
                alt={`${programData?.title}-side-2`}
                className="w-full h-full object-cover"
              />
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
                {t("target")}: Rp {programData?.target.funding}
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
                  <p className="fong-bold text-2xl">{programData?.donar}</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <MdVolunteerActivism className="text-4xl md:text-6xl" />
                  <p className="fong-bold text-2xl">{programData?.volunteer}</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <FaUsersLine className="text-4xl md:text-6xl" />
                  <p className="fong-bold text-2xl">
                    {programData?.beneficiery}
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
                  <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
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
                              <p className="text-sm text-dark_60">{item.job}</p>
                            </div>
                            <div className="flex items-center justify-start gap-2">
                              {item.contact.map((data) => {
                                // console.log(data.social);
                                return (
                                  <a href={data.url} className="">
                                    <img
                                      src={socailMatch[data.social]}
                                      alt={`${item.name}-${data.social}`}
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
                      <Link
                        to={`/Zakki-frontend-optimized/event/${item.slug}`}
                        key={item.slug}
                        className={`sm:grid sm:grid-cols-[60px_1fr] sm:gap-4 w-full ${
                          index !== 0 &&
                          "border-t border-slate-300 py-1 sm:border-0 sm:py-0"
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-[60px] h-[60px] aspect-square object-cover rounded-sm hidden sm:block"
                        />
                        <div className="flex flex-col gap-1">
                          <h5 className="font-bold text-lg truncate w-full">
                            {item.title}
                          </h5>
                          <div className="text-xs text-green-800 flex flex-col gap-0.5">
                            <div className="flex items-center gap-1">
                              <FaLocationDot />
                              <p className="w-fit truncate">{item.location}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <IoIosTime />
                              <p className="w-fit truncate">
                                {dayjs(item.date?.date).format("YYYY-MM-DD")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
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
              to="/Zakki-frontend-optimized/events"
              className="w-full py-1 text-center fond-medium border-2 border-green-800 rounded-md text-green-800 hover:bg-green-800 hover:text-white"
            >
              {t("more_event")}
            </Link>
            <Link
              to="/Zakki-frontend-optimized/joinus"
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
              {t("target")}: Rp {programData?.target.funding}
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
                <p className="fong-bold text-2xl">{programData?.donar}</p>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <MdVolunteerActivism className="text-4xl md:text-6xl" />
                <p className="fong-bold text-2xl">{programData?.volunteer}</p>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <FaUsersLine className="text-4xl md:text-6xl" />
                <p className="fong-bold text-2xl">{programData?.beneficiery}</p>
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
