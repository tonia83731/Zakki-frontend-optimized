import { useTranslation } from "react-i18next";
import DefaultInput from "../../../common/DefaultInput";
import { useFormContext } from "../../../../context/formContext";
const JobInfoForm = ({ jobSelect }: { jobSelect: string }) => {
  const { t } = useTranslation();
  const { jobInfo, handleInputChange } = useFormContext();
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
      <DefaultInput label={t("ans_job")} id="job" required={true}>
        <input
          id="job"
          type="text"
          name="job"
          className="form-input"
          placeholder="Job"
          required={true}
          value={jobSelect}
          disabled
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
                  checked={data.value === jobInfo.location}
                  onChange={(e) =>
                    handleInputChange("job", "location", e.target.value)
                  }
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
                  checked={data.value === jobInfo.time}
                  onChange={(e) =>
                    handleInputChange("job", "time", e.target.value)
                  }
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
            value={jobInfo.timezone}
            onChange={(e) =>
              handleInputChange("job", "timezone", e.target.value.toUpperCase())
            }
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

// https://docs.google.com/spreadsheets/d/1gejaoLWStRZp90gHvW3cvGFioXLV6aU8_OarKr-V0Vc/edit?gid=0#gid=0
// https://script.google.com/macros/s/AKfycbw-NdpdUFSO9h0H8arBrhFmgBdYSVtQG6qsKpHnqSPLuJZw2YTSOHspdb3W-iEJb9JcNA/exec
