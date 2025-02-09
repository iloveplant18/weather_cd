import { ReactNode } from "react";

type BaseSettingProps = {
  title: string;
  children: ReactNode;
};

function BaseSetting({ title, children }: BaseSettingProps) {
  return (
    <div className="flex justify-between">
      <span className="text-2xl font-bold">
        {title}
      </span>
      <div>
        {children}
      </div>
    </div>
  );
}

export default BaseSetting;
