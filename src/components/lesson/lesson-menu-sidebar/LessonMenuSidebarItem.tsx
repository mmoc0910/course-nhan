import { FC, useState } from "react";
import Chevron from "../../../icons/Chevron";
import CircleCheck from "../../../icons/CircleCheck";
import CirclePlay from "../../../icons/CirclePlay";
import classNames from "../../../utils/classNames";

type LessonMenuSidebarItemProps = {
  item: {
    title: string;
    childrens?: { title: string; haveLearned: boolean }[];
  };
};
export const LessonMenuSidebarItem: FC<LessonMenuSidebarItemProps> = ({
  item,
}) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <li>
      <div
        className="px-7 py-4 flex items-center justify-between font-semibold bg-[#dee9f3] cursor-pointer"
        onClick={() => setActive((prev) => !prev)}
      >
        <p>{item.title}</p>
        <Chevron type={active ? "up" : "down"} />
      </div>
      {item.childrens ? (
        <ul className={classNames(active ? 'block' : 'hidden')}>
          {item.childrens.map((item, index) => (
            <li
              className="flex items-center gap-2 px-7 py-4 bg-[#f6f7fb]"
              key={index}
            >
              {item.haveLearned ? (
                <CircleCheck className="fill-primary" />
              ) : (
                <CirclePlay />
              )}
              <p>{item.title}</p>
            </li>
          ))}
          {/* <li className="flex items-center gap-2 px-7 py-4 bg-[#f6f7fb]">
            <CirclePlay />
            <p>Giới thiệu outline khóa học</p>
          </li> */}
        </ul>
      ) : null}
    </li>
  );
};
