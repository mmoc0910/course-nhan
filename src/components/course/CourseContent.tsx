import { FC } from "react";
import Heading from "../common/Heading";
import { LessonType } from "../../types";

type CourseContentProps = {
  courseObjectives: string;
  listLesson?: LessonType[];
};
const CourseContent: FC<CourseContentProps> = ({
  courseObjectives,
  listLesson,
}) => {
  return (
    <div className="space-y-10">
      <div className="space-y-7">
        <Heading>Bạn sẽ nhận được</Heading>
        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
          {courseObjectives.split("\n").map((item, index) => (
            <div className="flex items-start gap-2" key={index}>
              <span className="mt-[5px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-5 h-5 fill-primary"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </span>
              <p className="text-lg">{item}</p>
            </div>
          ))}
        </div>
      </div>
      {listLesson ? (
        <div className="space-y-7">
          <Heading>Nội dung học tập</Heading>
          <ul>
            {listLesson.map((item) => (
              <div
                key={item._id}
                className="p-5 flex items-center gap-5 text-text2 bg-[#dfe8f6]"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" />
                  </svg>
                </span>
                <p className="font-medium text-lg">{item.title}</p>
              </div>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default CourseContent;
