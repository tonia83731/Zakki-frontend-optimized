import { ReactNode } from "react";

const DefaultInput = ({
  label,
  id,
  required = false,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: ReactNode;
}) => {
  return (
    <label htmlFor={id} className="flex flex-col gap-1">
      <div className="font-medium">
        {label}
        {required && <span className="text-error">*</span>}
      </div>
      {children}
    </label>
  );
};

export default DefaultInput;
