import { FC, ReactNode } from "react";

type HeadingProps = { children: ReactNode };
const Heading: FC<HeadingProps> = ({ children }) => {
  return <h3 className="text-2xl font-semibold pl-4 relative before:content-[''] before:w-[3px] before:rounded-full before:h-full before:bg-primary before:absolute before:top-0 before:left-0">{children}</h3>;
};

export default Heading;
