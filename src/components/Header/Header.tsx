import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HeaderLogo from "../../assets/logo/logo-main.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const languages = [
  { label: "ENG", value: "en", isDefault: true },
  { label: "INA", value: "ina" },
  { label: "ZHW", value: "zh" },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [currLang, setCurrLang] = useState("en");

  const headerData = [
    {
      id: 2,
      name: `${t("nav_programs")}`,
      link: "/programs",
    },
    {
      id: 3,
      name: `${t("nav_events")}`,
      link: "/events",
    },
    {
      id: 4,
      name: `${t("nav_join")}`,
      link: "/joinus",
    },
  ];

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const curr_lang = e.target.value;
    i18n.changeLanguage(curr_lang);
    const lang = localStorage.getItem("language");
    if (lang) localStorage.removeItem("language");
    localStorage.setItem("language", curr_lang);
    setCurrLang(curr_lang);
  };

  const getInitialLanguage = () => {
    const save_lang = localStorage.getItem("language");
    return save_lang ? save_lang : "en";
  };

  useEffect(() => {
    const initialLanguage = getInitialLanguage();
    i18n.changeLanguage(initialLanguage);
    setCurrLang(initialLanguage);
  }, [i18n]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-[999]">
      <div className="flex justify-between items-center h-12 md:h-16 px-4 md:px-8">
        {/* Mobile Menu */}
        <button
          className="md:hidden"
          onClick={() => setDropdownToggle(!dropdownToggle)}
        >
          <GiHamburgerMenu size={24} />
        </button>
        <div className="">
          <a href="/Zakki-frontend-optimized/">
            <img
              src={HeaderLogo}
              alt="Logo"
              className="w-full h-auto max-w-[150px]"
            />
          </a>
        </div>

        <nav
          className={`absolute md:relative top-12 md:top-auto left-0 w-full md:w-auto bg-primary_80 md:bg-transparent transition-transform ${
            dropdownToggle ? "block" : "hidden md:block"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 text-white md:text-green-800 text-lg font-medium text-center">
            {headerData.map((nav) => (
              <li
                key={nav.id}
                className="py-2 hover:bg-green-800 md:hover:bg-transparent md:py-0"
              >
                <Link to={`/Zakki-frontend-optimized${nav.link}`}>
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <select
          className="border-none bg-transparent text-gray-800 cursor-pointer"
          onChange={handleLanguageChange}
          value={currLang}
        >
          {languages.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
