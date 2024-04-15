import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/configureStore";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { CourseType } from "../../types";

const CourseTeacherPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [courses, setCourses] = useState<CourseType[]>([]);
  useEffect(() => {
    if (auth) {
      (async () => {
        try {
          const result = await axiosPrivate.get<CourseType[]>(
            `/courses?teacher=${auth._id}`
          );
          console.log("result - ", result.data);
          setCourses(result.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  if (courses.length > 0)
    return (
      <div className="space-y-10">
        <Link
          to={"/teacher/courses/add-course"}
          className="px-5 py-3 rounded-xl bg-secondary20 text-white font-medium"
        >
          Thêm khóa học mới
        </Link>
        <div className="grid grid-cols-5 gap-x-5 gap-y-10">
          {courses.map((item) => (
            <div
              className="w-full rounded-lg overflow-hidden border border-gray-soft shadow-xl"
              key={item._id}
            >
              <img
                src={item.poster}
                className="w-full h-[150px] object-cover"
              />
              <div className="p-4 text-lg font-medium flex flex-col gap-4">
                <p className="line-clamp-2">{item.title}</p>
                <div className="space-y-4 mt-auto">
                  <Link
                    to={`/teacher/courses/lessons/${item._id}`}
                    className="w-full py-2 rounded-lg bg-primary text-white flex items-center justify-center text-sm mt-auto"
                  >
                    Bài học
                  </Link>
                  <Link
                    to={`/teacher/courses/add-course/${item._id}`}
                    className="w-full py-2 rounded-lg bg-secondary20 text-white flex items-center justify-center text-sm"
                  >
                    Chỉnh sửa khóa học
                  </Link>
                </div>

                {/* <button
                  className="w-full py-2 rounded-lg bg-error text-white flex items-center justify-center text-sm"
                >
                  Xóa khóa học
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  return;
};

export default CourseTeacherPage;
