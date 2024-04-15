import { FC, ReactNode } from "react";
import { useDropdown } from "./dropdown-context";
import classNames from "../../utils/classNames";

interface ListProps {
  children: ReactNode;
  className?: string;
}

const List: FC<ListProps> = ({ children, className = "" }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div
          className={classNames(
            "absolute left-0 z-20 w-full bg-white rounded-lg shadow-lg border border-strock top-full scroll-hidden custom-scroll",
            className
          )}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default List;
