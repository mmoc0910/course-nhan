import { FC, ReactNode } from "react";

type TabContentProps = { children: ReactNode };
const TabContent: FC<TabContentProps> = ({ children }) => {
  return <div className="flex-1">{children}</div>;
};

export default TabContent;
