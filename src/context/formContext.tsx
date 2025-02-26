/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import validator from "validator";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

type BasicInfoType = {
  name: string;
  age: number;
  phone: string;
  email: string;
};

type JobInfoType = {
  job: string | null;
  location: string | null;
  time: string | null;
  timezone: string;
};

interface FormContextValue {
  currStep: number;
  basicInfo: BasicInfoType;
  policyConfirm: boolean;
  basicDisabled: boolean;
  jobInfo: JobInfoType;
  jobDisabled: boolean;
  comment: string;
  formLoading: boolean;
  handleInputChange: (
    type: "basic" | "job" | "comment",
    name: keyof BasicInfoType | keyof JobInfoType | "policy" | "comment",
    value: any
  ) => void;
  handleStepChange: (type: "prev" | "next") => void;
  handleFormSubmit: (e: any) => void;
}

export const FormContext = createContext<FormContextValue | undefined>(
  undefined
);

export function FormProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [currStep, setCurrStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    age: 20,
    phone: "",
    email: "",
  });
  const [policyConfirm, setPolicyCofirm] = useState(false);
  const [basicDisabled, setBasicDisabled] = useState(true);
  const [jobInfo, setJobInfo] = useState({
    job: null,
    location: null,
    time: null,
    timezone: "",
  });
  const [jobDisabled, setJobDisabled] = useState(true);
  const [comment, setComment] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const handleInputChange = (
    type: "basic" | "job" | "comment",
    name: keyof BasicInfoType | keyof JobInfoType | "policy" | "comment",
    value: any
  ) => {
    if (type === "basic") {
      setBasicInfo((prev) => ({ ...prev, [name]: value }));
      if (name === "policy") {
        setPolicyCofirm(value);
      }
    } else if (type === "job") {
      setJobInfo((prev) => ({ ...prev, [name]: value }));
    } else {
      setComment(value);
    }
  };

  const handleStepChange = (type: "prev" | "next") => {
    if (type === "prev") {
      setCurrStep(currStep - 1);
    } else {
      setCurrStep(currStep + 1);
    }
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setFormLoading(true);
    const script = import.meta.env.VITE_APP_GOOGLE_FORM_SCRIPT;
    const formData = new FormData();
    Object.entries(basicInfo).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    Object.entries(jobInfo).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    formData.append("comment", comment);

    try {
      const res = await fetch(script, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("success");
        setFormLoading(false);
        Swal.fire({
          title: `${t("form_success")}`,
          text: `${t("form_success_sub")}`,
          icon: "success",
          confirmButtonText: `${t("form_success_btn")}`,
        });
        initializedData();
      } else {
        console.log("error");
        setFormLoading(false);
        Swal.fire({
          title: `${t("form_failed")}`,
          text: `${t("form_failed_sub")}`,
          icon: "error",
          confirmButtonText: `${t("form_failed_btn")}`,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: `${t("form_failed")}`,
        text: `${t("form_failed_sub")}`,
        icon: "error",
        confirmButtonText: `${t("form_failed_btn")}`,
      });
    }
  };
  const initializedData = () => {
    setCurrStep(0);
    setBasicInfo({
      name: "",
      age: 20,
      phone: "",
      email: "",
    });
    setPolicyCofirm(false);
    setBasicDisabled(true);
    setJobInfo({
      job: null,
      location: null,
      time: null,
      timezone: "",
    });
    setJobDisabled(true);
    setComment("");
  };

  useEffect(() => {
    if (
      !basicInfo.name ||
      basicInfo.name.trim() === "" ||
      !basicInfo.email ||
      !validator.isEmail(basicInfo.email) ||
      !policyConfirm
    ) {
      setBasicDisabled(true);
    } else {
      setBasicDisabled(false);
    }
  }, [basicInfo]);

  useEffect(() => {
    if (
      !jobInfo.job ||
      !jobInfo.location ||
      !jobInfo.time ||
      !jobInfo.timezone ||
      jobInfo.timezone.trim() === ""
    ) {
      setJobDisabled(true);
    } else {
      setJobDisabled(false);
    }
  }, [jobInfo]);

  return (
    <FormContext.Provider
      value={{
        currStep,
        basicInfo,
        policyConfirm,
        jobInfo,
        comment,
        basicDisabled,
        jobDisabled,
        formLoading,
        handleInputChange,
        handleStepChange,
        handleFormSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
