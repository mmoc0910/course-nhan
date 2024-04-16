import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/configureStore";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { CourseType } from "../../types";
import { Tooltip } from "antd";
import { toast } from "react-toastify";

const CourseTeacherPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [courses, setCourses] = useState<CourseType[]>([]);
  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  const fetchData = async () => {
    try {
      if (auth) {
        const result = await axiosPrivate.get<CourseType[]>(
          `/courses?teacher=${auth._id}`
        );
        console.log("result - ", result.data);
        setCourses(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitCourse = async (_id: string) => {
    try {
      await axiosPrivate.patch(`/courses/${_id}`, { approve: 2 });
      fetchData();
      toast("Success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-10">
      <Link
        to={"/teacher/courses/add-course"}
        className="px-5 py-3 rounded-xl bg-secondary20 text-white font-medium"
      >
        Thêm khóa học mới
      </Link>
      <div className="">
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
                  {item.approve === 0 ? (
                    <p className="text-error text-center text-sm">
                      Khóa học của bạn bị từ chối vì vi phạm{" "}
                      <Link
                        to={"/"}
                        className="text-secondary underline decoration-secondary"
                      >
                        quy tắc cộng đồng
                      </Link>
                    </p>
                  ) : item.approve === 1 ? (
                    <p className="text-primary text-center text-sm">
                      Khóa học của bạn đã được phê duyệt
                    </p>
                  ) : item.approve === 2 ? (
                    <p className="text-secondary text-center text-sm">
                      Khóa học của bạn đang được phê duyệt
                    </p>
                  ) : (
                    ""
                  )}
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
                {item.approve === 3 ? (
                  <Tooltip title="Sau khi submit khóa học để admin phê duyệt bạn không thể chỉnh sửa khoa học cân nhắc trước khi làm điều đó">
                    <button
                      onClick={() => handleSubmitCourse(item._id)}
                      className="w-full py-2 rounded-lg bg-error text-white flex items-center justify-center text-sm"
                    >
                      Submit khóa học
                    </button>
                  </Tooltip>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseTeacherPage;
