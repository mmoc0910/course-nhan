import { ReactNode } from "react";
import { useDropdown } from "./dropdown-context";
import classNames from "../../utils/classNames";

const Option = ({
  children,
  onClick,
  className = "",
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) => {
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className={classNames(
        "flex items-center justify-between px-5 py-4 transition-all cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Option;
