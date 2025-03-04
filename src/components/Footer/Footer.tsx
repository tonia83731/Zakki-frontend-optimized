import FooterFollowSection from "./FooterFollowSection";

import FooterLogoIcon from "../../assets/logo/logo main white.svg";
import FooterSection from "./FooterSection";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const aboutUsData = [{ id: 1, name: `${t("footer_about")}`, href: "#" }];
  const involvedData = [
    {
      id: 1,
      name: `${t("footer_donate")}`,
      href: "#",
    },
    {
      id: 2,
      name: `${t("footer_volunteer")}`,
      herf: "/joinus",
      href: "#",
    },
    {
      id: 3,
      name: `${t("footer_partner")}`,
      href: "#",
    },
  ];

  const contactData = [
    {
      id: 1,
      name: "info@zakki.org",
      href: "mailto:info@zakki.org",
    },
    {
      id: 2,
      name: "+62 819 9919 1498",
      href: "tel:+6281999191498",
    },
  ];

  const infoData = [
    {
      id: 1,
      name: `${t("footer_faq")}`,
      href: "#",
    },
    {
      id: 2,
      name: `${t("footer_privacy")}`,
      href: "#",
    },
    {
      id: 3,
      name: `${t("footer_cookie")}`,
      href: "#",
    },
    {
      id: 4,
      name: `${t("footer_term")}`,
      href: "#",
    },
  ];
  return (
    <footer className="bg-neutral_80 text-white w-full mt-auto">
      <div className="py-[40px] px-[24px] max-w-[1200px] mx-auto flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="hidden md:block">
          <FooterLogoIcon />
        </div>
        <FooterSection title={`${t("footer_aboutus")}`} data={aboutUsData} />
        <FooterSection title={`${t("footer_involved")}`} data={involvedData} />
        <div className="flex flex-col gap-4">
          <FooterSection title={`${t("footer_contact")}`} data={contactData} />
          <FooterFollowSection title={`${t("footer_follow")}`} />
        </div>
        <FooterSection title={`${t("footer_info")}`} data={infoData} />
      </div>
    </footer>
  );
}
