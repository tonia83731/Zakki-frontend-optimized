import { ReactNode } from "react";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto pt-12 md:pt-16">
      {children}
    </div>
  );
};

export default MainContainer;
