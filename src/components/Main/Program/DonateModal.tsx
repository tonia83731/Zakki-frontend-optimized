/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { RxCross2 } from "react-icons/rx";
import { IoIosWarning } from "react-icons/io";
import DefaultInput from "../../common/DefaultInput";

export type DonateInputType = {
  fullName: string;
  email: string;
  price: number;
};
const DonateModal = ({
  title,
  inputValue,
  onModalClose,
  onInputChange,
  onDonateSubmit,
  onDonateCancel,
}: {
  title: ReactNode;
  inputValue: DonateInputType;
  onModalClose: () => void;
  onInputChange: (name: keyof DonateInputType, value: any) => void;
  onDonateSubmit: () => void;
  onDonateCancel: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="fixed top-0 left-0 w-full h-full min-h-screen bg-dark_40">
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-white rounded-lg w-[90%] md:max-w-[600px] lg:w-full mx-auto">
          <div className="flex items-center justify-between gap-4 px-4 py-2 border-b border-slate-200">
            <h1 className="font-bold text-lg">Donate to "{title}"</h1>
            <button className="text-lg" onClick={onModalClose}>
              <RxCross2 />
            </button>
          </div>
          <div className="py-2 px-4 flex flex-col gap-4">
            <div className="bg-warning text-white font-medium px-4 py-1.5">
              <h5 className="flex items-center gap-2">
                <IoIosWarning />
                <p>{t("caution")}</p>
              </h5>
              <p>{t("caution_text")}</p>
              <p>{t("caution_text_2")}</p>
            </div>
            <div className="flex flex-col gap-4">
              <DefaultInput
                label={t("ans_name")}
                id="full-name"
                required={true}
              >
                <input
                  type="text"
                  id="full-name"
                  name="fullName"
                  className="form-input"
                  placeholder="Joe Doe"
                  value={inputValue.fullName}
                  onChange={(e: any) =>
                    onInputChange(e.target.name, e.target.value)
                  }
                />
              </DefaultInput>
              <DefaultInput label={t("ans_email")} id="email" required={true}>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="joe.d@example.com"
                  value={inputValue.email}
                  onChange={(e: any) =>
                    onInputChange(e.target.name, e.target.value)
                  }
                />
              </DefaultInput>
              <DefaultInput
                label={t("donate_price")}
                id="price"
                required={true}
              >
                <div className="flex items-center gap-2">
                  <p>Rp.</p>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="form-input w-full"
                    placeholder="10,000"
                    value={inputValue.price}
                    onChange={(e: any) =>
                      onInputChange(e.target.name, e.target.value)
                    }
                  />
                </div>
              </DefaultInput>
            </div>
            <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4">
              <button
                onClick={onDonateCancel}
                className="bg-slate-300 text-white w-full rounded-md py-1.5"
              >
                {t("cancel")}
              </button>
              <button
                onClick={onDonateSubmit}
                disabled={
                  !inputValue.fullName ||
                  !inputValue.email ||
                  !inputValue.price ||
                  inputValue.price === 0
                }
                className="bg-primary text-white w-full rounded-md py-1.5 disabled:bg-slate-300"
              >
                {t("donate")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
