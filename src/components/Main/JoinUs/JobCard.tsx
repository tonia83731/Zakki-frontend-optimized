/* eslint-disable @typescript-eslint/no-explicit-any */
import { GrWorkshop } from "react-icons/gr";
import { FaHourglassHalf } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const JobCard = ({
  _id,
  title,
  image,
  location,
  duration,
  selectedJob,
  onInfoClick,
  onJobSelect,
}: {
  _id: string;
  title: string;
  image: string;
  location: string;
  duration: number;
  selectedJob: {
    id: string;
    title: string;
  };
  onInfoClick: (e: any, _id: string) => void;
  onJobSelect: (_id: string, title: string) => void;
}) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={() => onJobSelect(_id, title)}
      className={`bg-center bg-no-repeat bg-cover rounded-lg w-[280px] h-[200px] flex-shrink-0 relative ${
        selectedJob.id === _id && "border-2 border-primary"
      }`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex flex-col gap-2 bg-light_60 hover:bg-light_80 w-full rounded-b-lg absolute bottom-0 left-0 px-4 py-2">
        <div className="flex items-center gap-4 justify-between">
          <h5 className="text-lg font-bold">{title}</h5>
          <button
            onClick={(e) => onInfoClick(e, _id)}
            className="text-green_focus hover:underline hover:underline-offset-2 hover:font-medium"
          >
            {t("more")}
          </button>
        </div>
        <div className="text-sm text-green-800 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <GrWorkshop />
            <p>{location}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaHourglassHalf />
            <p>{duration} months</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
