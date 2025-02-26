import { useTranslation } from "react-i18next";
import DefaultInput from "../../../common/DefaultInput";
import { IoIosWarning } from "react-icons/io";
import { useFormContext } from "../../../../context/formContext";

const CommentForm = () => {
  const { t } = useTranslation();
  const { comment, handleInputChange } = useFormContext();
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-warning text-white font-medium px-4 py-1.5 flex items-center gap-2">
        <div className="text-lg">
          <IoIosWarning />
        </div>
        <div>
          <p>
            {t("ans_remind")}&nbsp;
            <a
              href="mailto:info@zakki.org"
              target="_blank"
              className="hover:underline hover:underline-offset-2"
            >
              info@zakki.org
            </a>
          </p>
          <p>{t("ans_remind_2")}</p>
        </div>
      </div>
      <DefaultInput label={t("ans_comment")} id="comment">
        <textarea
          name="comment"
          id="comment"
          rows={3}
          className="form-input overflow-x-hidden"
          placeholder={t("ans_comment")}
          onChange={(e) =>
            handleInputChange("comment", "comment", e.target.value)
          }
        >
          {comment}
        </textarea>
      </DefaultInput>
    </div>
  );
};

export default CommentForm;
