import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { LessonType } from "../../types";
import CirclePlay from "../../icons/CirclePlay";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setBreadcumb } from "../../store/breadcumb/breadcumbSlice";

const LessonTeacherPage = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { courseId } = useParams();
  const [listLesson, setListLesson] = useState<LessonType[]>([]);
  const maxorder = listLesson.reduce(
    (max, item) => (item.order > max ? item.order : max),
    listLesson.length > 0 ? listLesson[0].order : 0
  );
  console.log("max order", maxorder); useEffect(() => {
    dispatch(
      setBreadcumb([
        {
          title: "Khóa học",
          url: '/teacher/courses',
        },
        {
          title: "Danh sách bài học",
          url: `/teacher/courses/lessons/${courseId}`,
        },
      ])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);
  const fetchData = async () => {
    try {
      const result = await axiosPrivate.get<LessonType[]>(
        `/lessons?course=${courseId}`
      );
      console.log(result.data);
      setListLesson(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteLesson = async (_id: string) => {
    try {
      await axiosPrivate.delete(`/lessons/${_id}`);
      fetchData();
      toast("Xóa thành công");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-10">
      <Link
        to={`/teacher/courses/add-lesson/${maxorder + 1}/${courseId}`}
        className="px-5 py-3 rounded-xl bg-secondary20 text-white font-medium"
      >
        Thêm bài học mới
      </Link>
      {listLesson.length > 0 ? (
        <ul>
          {listLesson.map((item) => (
            <li
              key={item._id}
              className="group flex items-center justify-between px-7 py-4 bg-[#ecefff] hover:bg-[#dee9f3] transition-all duration-300 cursor-pointer"
            >
              <Link
                to={`/teacher/courses/edit-lesson/${item._id}`}
                className="flex items-center gap-2"
              >
                <CirclePlay />
                <p>{item.title}</p>
              </Link>
              <div className="flex items-center gap-5">
                {!item.test ? (
                  <Link
                    to={`/teacher/courses/${courseId}/lessons/add-test/${item._id}`}
                    className="py-2 px-4 bg-secondary20 rounded-xl text-white invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300"
                  >
                    Thêm bài kiểm tra
                  </Link>
                ) : (
                  <Link
                    to={`/teacher/courses/${courseId}/lessons/${item._id}/edit-test/${item.test._id}`}
                    className="py-2 px-4 bg-secondary20 rounded-xl text-white invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300"
                  >
                    Chỉnh sửa bài kiểm tra
                  </Link>
                )}

                <button
                  onClick={() => handleDeleteLesson(item._id)}
                  className="py-2 px-4 bg-error rounded-xl text-white invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300"
                >
                  Xóa bài học
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">
          Bạn chưa thêm bài giảng nào vào khóa học.{" "}
          <Link
            to={`/teacher/courses/add-lesson/${maxorder + 1}/${courseId}`}
            className="font-semibold text-secondary underline decoration-secondary mt-10"
          >
            Thêm ngay
          </Link>
        </p>
      )}
    </div>
  );
};

export default LessonTeacherPage;
