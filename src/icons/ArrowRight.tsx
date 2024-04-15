import { FC } from "react";
import classNames from "../utils/classNames";

type ArrowRightProps = { className?: string };
export const ArrowRight: FC<ArrowRightProps> = ({ className = "" }) => {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className={classNames("w-4 h-4 fill-current", className)}
      >
        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
      </svg>
    </span>
  );
};
