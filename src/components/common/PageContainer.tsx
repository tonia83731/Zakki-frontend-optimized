import { ReactNode } from "react";

const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto pt-12 md:pt-16 px-4 md:px-8">
      {children}
    </div>
  );
};

export default PageContainer;
