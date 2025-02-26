import { useTranslation } from "react-i18next";
import DefaultInput from "../../../common/DefaultInput";
import { useFormContext } from "../../../../context/formContext";

const BasicInfoForm = () => {
  const { t } = useTranslation();
  const { basicInfo, policyConfirm, handleInputChange } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <DefaultInput label={t("ans_name")} id="name" required={true}>
          <input
            id="name"
            type="text"
            name="name"
            className="form-input"
            placeholder="Joe Doe"
            required={true}
            value={basicInfo.name}
            onChange={(e) => handleInputChange("basic", "name", e.target.value)}
          />
        </DefaultInput>
        <DefaultInput label={t("ans_age")} id="age">
          <input
            id="age"
            type="text"
            name="age"
            className="form-input"
            placeholder="20"
            value={basicInfo.age}
            onChange={(e) => handleInputChange("basic", "age", e.target.value)}
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
            value={basicInfo.phone}
            onChange={(e) =>
              handleInputChange("basic", "phone", e.target.value)
            }
          />
        </DefaultInput>
        <DefaultInput label={t("ans_email")} id="email" required={true}>
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="joe.d@exampe.com"
            required={true}
            value={basicInfo.email}
            onChange={(e) =>
              handleInputChange("basic", "email", e.target.value)
            }
          />
        </DefaultInput>
      </div>
      <div className="flex items-center gap-2">
        <input
          id="policy"
          name="policy"
          type="checkbox"
          className="accent-primary"
          checked={policyConfirm}
          onChange={(e) =>
            handleInputChange("basic", "policy", e.target.checked)
          }
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
