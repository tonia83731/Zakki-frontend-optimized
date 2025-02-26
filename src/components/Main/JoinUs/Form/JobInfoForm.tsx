import { useTranslation } from "react-i18next";
import DefaultInput from "../../../common/DefaultInput";

const JobInfoForm = ({ jobSelect }: { jobSelect: string }) => {
  const { t } = useTranslation();
  const locationData = [
    {
      value: "in-person",
      label: `${t("ans_location_opt_inperson")}`,
    },
    {
      value: "virtual",
      label: `${t("ans_location_opt_virtual")}`,
    },
  ];

  const timeData = [
    {
      value: "anytime",
      label: `${t("ans_time_opt_anytime")}`,
    },
    {
      value: "5to8",
      label: "5-8 pm",
    },
    {
      value: "9to12",
      label: "9-12 am",
    },
    {
      value: "13to16",
      label: "1-4 pm",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <DefaultInput label={t("ans_job")} id="job_title" required={true}>
        <input
          id="job_title"
          type="text"
          name="job_title"
          className="form-input"
          placeholder="Job"
          required={true}
          value={jobSelect}
        />
      </DefaultInput>
      <div className="flex flex-col gap-1">
        <h5 className="font-medium">
          {t("ans_location")}
          <span className="text-error">*</span>
        </h5>
        <div className="grid grid-cols-2">
          {locationData.map((data) => {
            return (
              <div className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  id={data.value}
                  value={data.value}
                  key={data.value}
                />
                <label htmlFor={data.value} className="text-sm">
                  {data.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h5 className="font-medium">
          {t("ans_time")}
          <span className="text-error">*</span>
        </h5>
        <div className="grid grid-cols-2">
          {timeData.map((data) => {
            return (
              <div className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="time"
                  id={data.value}
                  value={data.value}
                  key={data.value}
                />
                <label htmlFor={data.value} className="text-sm">
                  {data.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <DefaultInput label={t("ans_timezone")} id="timezone" required={true}>
          <input
            id="timezone"
            type="text"
            name="timezone"
            className="form-input"
            placeholder="PST"
            required={true}
          />
        </DefaultInput>
        <div className="text-sm">
          {t("ans_timezone_text")}&nbsp;
          <a
            className="underline underline-offset-2"
            href="https://www.ge.com/digital/documentation/meridium/V36160/Help/Master/Subsystems/AssetPortal/Content/Time_Zone_Mappings.htm"
          >
            {t("ans_timezone_link")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobInfoForm;
