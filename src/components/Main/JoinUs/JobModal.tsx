import { useTranslation } from "react-i18next";
import { RxCross2 } from "react-icons/rx";
export default function JobModal({
  requirements,
  onModalClose,
}: {
  requirements: string;
  onModalClose: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="fixed top-0 left-0 w-full h-full min-h-screen bg-dark_40">
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-white rounded-lg w-[90%] md:max-w-[600px] lg:w-full mx-auto">
          <div className="flex items-center justify-between gap-4 px-4 py-2 border-b border-slate-200">
            <h1 className="font-bold text-lg">{t("job_requirement")}</h1>
            <button className="text-lg" onClick={onModalClose}>
              <RxCross2 />
            </button>
          </div>
          <div className="p-4 whitespace-pre-wrap text-sm md:text-base text-dark_80">
            {requirements}
          </div>
        </div>
      </div>
    </div>
  );
}
