import { ReactNode } from "react";

const MainTitle = ({
  children,
  color = "#0A0A0A",
}: {
  children: ReactNode;
  color?: string;
}) => {
  return (
    <div className={`font-poppins font-bold text-[${color}] text-xl`}>
      {children}
    </div>
  );
};

const SubTitle = ({
  children,
  color = "#0A0A0A",
  margin = "0",
}: {
  children: ReactNode;
  color?: string;
  margin?: string;
}) => {
  return (
    <div
      className={`font-poppins font-bold text-[${color}] text-lg m-[${margin}]`}
    >
      {children}
    </div>
  );
};

const SubTitle2 = ({
  children,
  color = "#0A0A0A",
  margin = "0",
}: {
  children: ReactNode;
  color?: string;
  margin?: string;
}) => {
  return (
    <div
      className={`font-poppins font-bold text-[${color}] text-base m-[${margin}]`}
    >
      {children}
    </div>
  );
};

export { MainTitle, SubTitle, SubTitle2 };
