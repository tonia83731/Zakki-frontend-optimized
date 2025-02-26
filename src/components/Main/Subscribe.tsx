import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export default function Subscribe() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.length === 0) return;
    if (isValidEmail(email)) {
      Swal.fire({
        icon: "success",
        title: `The news will sent to ${email}`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: `Oops...${email} is not valid, please try again`,
      });
    }
  };
  return (
    <section id="subscribe" className="py-6">
      <div className="text-center w-11/12 mx-auto lg:max-w-[900px] lg:flex lg:gap-6 lg:items-center">
        <label
          htmlFor="subscribe-input"
          className="w-full text-xl font-bold text-black mb-4 md:mb-0"
        >
          {t("subscribe_title")}
        </label>

        <form
          onSubmit={handleSubmit}
          className="w-full mt-4 h-8 md:h-12 flex items-center justify-center md:mt-0"
        >
          <input
            type="email"
            id="subscribe-input"
            placeholder={t("subscribe_placeholder")}
            value={email}
            onChange={handleChange}
            className="w-7/10 h-full border border-primary rounded-l-md px-4 text-neutral-700 text-sm focus:border-green-500 focus:outline-none"
          />
          <button
            type="submit"
            id="subscribe-submit"
            className="h-full bg-primary text-white rounded-r-md px-4 text-lg"
          >
            {t("subscribe_btn")} &#10148;
          </button>
        </form>
      </div>
    </section>
  );
}
