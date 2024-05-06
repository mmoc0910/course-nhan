import { Link } from "react-router-dom";
import { CourseType } from "../../types";
import { FC } from "react";

type CourseItemProps = { course: CourseType };
const CourseItem: FC<CourseItemProps> = ({ course }) => {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-soft relative">
      {/* <p className="bg-secondary40 text-xs text-white px-2 py-1 rounded-tl-lg rounded-br-lg absolute left-0 top-0">
        New
      </p> */}
      <img src={course.poster} className="w-full h-[150px] object-cover" />
      <div className="p-4 text-lg font-medium space-y-4">
        <p className="line-clamp-2 h-[56px]">{course.title}</p>
        <p className="text-xs">
          Giáo viên:{" "}
          <Link to={"/"} className="text-primary font-medium">
            {course.teacher.name}
          </Link>
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-4 h-4 fill-error"
              >
                <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
              </svg>
            </span>
            <p className="text-xs">
              <span className="font-medium text-primary">{course.totalLesson}</span> bài học
            </p>
          </div>
          {/* <div className="flex items-center gap-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-4 h-4 fill-secondary20"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
              </svg>
            </span>
            <p className="text-xs">
              <span className="font-medium text-primary">100</span> Câu hỏi
            </p>
          </div> */}
        </div>
        <Link
          to={`/course/${course._id}`}
          className="w-full py-2 rounded-lg bg-primary text-white uppercase flex items-center justify-center text-sm"
        >
          tìm hiểu thêm
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
