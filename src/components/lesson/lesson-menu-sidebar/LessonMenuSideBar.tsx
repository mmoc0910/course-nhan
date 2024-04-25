import { FC } from "react";
import CirclePlay from "../../../icons/CirclePlay";
import { CourseType } from "../../../types";
import { NavLink } from "react-router-dom";
import classNames from "../../../utils/classNames";
import CircleCheck from "../../../icons/CircleCheck";
import { CircleXMark } from "../../../icons/CircleXMark";

type LessonMenuSideBarProps = {
  course: CourseType;
  lessonComplete: number;
  studentId?: string;
};
const LessonMenuSideBar: FC<LessonMenuSideBarProps> = ({
  course,
  lessonComplete,
  studentId,
}) => {
  console.log("studentId - ", studentId);
  if (!studentId)
    return (
      <ul>
        {course.listLesson &&
          course.listLesson.map((item) => {
            const isPlay = item.order <= lessonComplete + 1;
            if (isPlay)
              return (
                <NavLink
                  to={`/course/${item.course}/lesson/${item._id}`}
                  key={item._id}
                  className={({ isActive }) =>
                    classNames(
                      "flex items-center gap-2 px-7 py-4",
                      isActive ? "bg-[#dee9f3]" : "bg-[#dee9f361]"
                    )
                  }
                >
                  {item.order <= lessonComplete ? (
                    <CircleCheck className="fill-primary" />
                  ) : (
                    <CirclePlay />
                  )}

                  <p>{item.title}</p>
                </NavLink>
              );
            return (
              <div
                key={item._id}
                className={classNames(
                  "flex items-center gap-2 px-7 py-4 bg-[#dee9f361]"
                )}
              >
                <CircleXMark className="fill-error" />
                <p>{item.title}</p>
              </div>
            );
          })}
      </ul>
    );
  return (
    <ul>
      {course.listLesson &&
        course.listLesson.map((item) => {
          const isPlay = item.order <= lessonComplete + 1;
          if (isPlay)
            return (
              <NavLink
                to={`/student/${studentId}/course/${item.course}/lesson/${item._id}`}
                key={item._id}
                className={({ isActive }) =>
                  classNames(
                    "flex items-center gap-2 px-7 py-4",
                    isActive ? "bg-[#dee9f3]" : "bg-[#dee9f361]"
                  )
                }
              >
                {item.order <= lessonComplete ? (
                  <CircleCheck className="fill-primary" />
                ) : (
                  <CirclePlay />
                )}

                <p>{item.title}</p>
              </NavLink>
            );

          return (
            <NavLink
              to={`/student/${studentId}/course/${item.course}/lesson/${item._id}`}
              key={item._id}
              className={({ isActive }) =>
                classNames(
                  "flex items-center gap-2 px-7 py-4",
                  isActive ? "bg-[#dee9f3]" : "bg-[#dee9f361]"
                )
              }
            >
              <CircleXMark className="fill-error" />
              <p>{item.title}</p>
            </NavLink>
          );
        })}
    </ul>
  );
};

export default LessonMenuSideBar;
