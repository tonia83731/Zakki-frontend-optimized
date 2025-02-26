import { useTranslation } from "react-i18next";
import DefaultInput from "../../../common/DefaultInput";

const BasicInfoForm = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <DefaultInput label={t("ans_name")} id="full_name">
          <input
            id="full_name"
            type="text"
            name="full_name"
            className="form-input"
            placeholder="Joe Doe"
            required={true}
          />
        </DefaultInput>
        <DefaultInput label={t("ans_age")} id="age">
          <input
            id="age"
            type="text"
            name="age"
            className="form-input"
            placeholder="20"
          />
        </DefaultInput>
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultInput label={t("ans_phone")} id="phone">
          <input
            id="phone"
            type="tel"
            name="phone"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            className="form-input"
            placeholder="+62 08525678889"
          />
        </DefaultInput>
        <DefaultInput label={t("ans_email")} id="email">
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="joe.d@exampe.com"
            required={true}
          />
        </DefaultInput>
      </div>
      <div className="flex items-center gap-2">
        <input
          id="policy"
          name="policy"
          type="checkbox"
          className="accent-primary"
        />
        <label htmlFor="policy" className="font-medium">
          {t("ans_policy_a")}{" "}
          <span>
            <a href="#" className="underline underline-offset-2">
              {t("ans_policy_b")}
            </a>
          </span>
          <span className="text-error">*</span>
        </label>
      </div>
    </div>
  );
};

export default BasicInfoForm;
