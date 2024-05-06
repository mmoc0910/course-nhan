import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/configureStore";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { CourseType, LessonType } from "../../types";
import { Tooltip } from "antd";
import { toast } from "react-toastify";
import { Tab } from "../../components/tab/Tab";
import TabContent from "../../components/tab/TabContent";
import { ITab } from "../../components/tab/type";
import { setBreadcumb } from "../../store/breadcumb/breadcumbSlice";

const tabs: ITab[] = [
  { key: "1", title: "Đã được phê duyệt" },
  { key: "2", title: "Chờ phê duyệt" },
  { key: "0", title: "Bị từ chối" },
  { key: "3", title: "Chưa gửi đăng ký" },
];
const CourseTeacherPage = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [courses, setCourses] = useState<CourseType[]>([]);
  useEffect(() => {
    dispatch(
      setBreadcumb([
        {
          title: "Khóa học",
          url: "/teacher/courses",
        },
      ])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  const fetchData = async () => {
    try {
      if (auth) {
        const result = await axiosPrivate.get<CourseType[]>(
          `/courses?teacher=${auth._id}&status=1`
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
      const result = await axiosPrivate.get<LessonType[]>(
        `/lessons?course=${_id}`
      );
      if (result.data.length > 0) {
        if (result.data.some((item) => !item.test)) {
          toast("Bạn chưa thêm đủ bài tập");
        } else {
          await axiosPrivate.patch(`/courses/${_id}`, { approve: 2 });
          fetchData();
          toast("Success");
        }
      } else {
        toast("Bạn chưa thêm bài học");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCourse = async (_id: string) => {
    try {
      await axiosPrivate.patch(`/courses/${_id}`, { status: 0 });
      fetchData();
      toast("Xóa thành công");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-5">
      <Link
        to={"/teacher/courses/add-course"}
        className="px-5 py-3 rounded-xl bg-secondary20 text-white font-medium"
      >
        Thêm khóa học mới
      </Link>
      <div className="">
        <Tab
          tabs={tabs}
          classNameTabItem="pb-3 pt-7"
          classNameWrapperContent="!pt-10"
          colorTab="#1DC071"
        >
          <TabContent>
            <div className="grid grid-cols-4 gap-x-5 gap-y-10 pb-10">
              {courses.map((item) => {
                if (item.approve === 1)
                  return (
                    <Courseitem
                      item={item}
                      key={item._id}
                      handleSubmitCourse={handleSubmitCourse}
                    />
                  );
                return;
              })}
            </div>
          </TabContent>
          <TabContent>
            <div className="grid grid-cols-4 gap-x-5 gap-y-10 pb-10">
              {courses.map((item) => {
                if (item.approve === 2)
                  return (
                    <Courseitem
                      item={item}
                      key={item._id}
                      handleSubmitCourse={handleSubmitCourse}
                    />
                  );
                return;
              })}
            </div>
          </TabContent>
          <TabContent>
            <div className="grid grid-cols-4 gap-x-5 gap-y-10 pb-10">
              {courses.map((item) => {
                if (item.approve === 0)
                  return (
                    <Courseitem
                      item={item}
                      key={item._id}
                      handleSubmitCourse={handleSubmitCourse}
                    />
                  );
                return;
              })}
            </div>
          </TabContent>
          <TabContent>
            <div className="grid grid-cols-4 gap-x-5 gap-y-10 pb-10">
              {courses.map((item) => {
                if (item.approve === 3)
                  return (
                    <Courseitem
                      item={item}
                      key={item._id}
                      handleSubmitCourse={handleSubmitCourse}
                      handleDeleteCourse={handleDeleteCourse}
                    />
                  );
                return;
              })}
            </div>
          </TabContent>
        </Tab>
      </div>
    </div>
  );
};

export const Courseitem = ({
  item,
  handleSubmitCourse,
  message = true,
  handleDeleteCourse = () => {},
}: {
  item: CourseType;
  handleSubmitCourse: (_id: string) => void;
  message?: boolean;
  handleDeleteCourse?: (_id: string) => void;
}) => {
  return (
    <div
      className="w-full rounded-lg border border-gray-soft shadow-xl flex flex-col"
      key={item._id}
    >
      <img
        src={item.poster}
        className="w-full h-[150px] object-cover rounded-tr-lg rounded-tl-lg"
      />
      <div className="p-4 text-lg font-medium flex flex-col justify-between gap-4 flex-1">
        <p className="line-clamp-2">{item.title}</p>
        <div className="space-y-4">
          {message ? (
            <>
              {item.approve === 0 ? (
                <p className="text-error text-center text-sm">
                  Khóa học của bạn bị từ chối vì vi phạm{" "}
                  <Link
                    to={"/community-standard"}
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
            </>
          ) : null}
          {item.approve === 3 || item.approve === 0 ? (
            <Link
              to={`/teacher/courses/lessons/${item._id}`}
              className="w-full py-2 cursor-pointer rounded-lg bg-teal-500 text-white flex items-center justify-center text-sm mt-auto"
            >
              Chỉnh sửa nội dung khóa học
            </Link>
          ) : (
            <Link
              to={`/course/${item._id}`}
              target="_blank"
              className="w-full py-2 cursor-pointer rounded-lg bg-primary text-white flex items-center justify-center text-sm mt-auto"
            >
              Chi tiết khóa học
            </Link>
          )}

          {item.approve === 3 || item.approve === 0 ? (
            <Link
              to={`/teacher/courses/add-course/${item._id}`}
              className="w-full py-2 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-sm"
            >
              Chỉnh sửa thông tin khóa học
            </Link>
          ) : null}
        </div>
        {item.approve === 3 || item.approve === 0 ? (
          <Tooltip title="Sau khi submit khóa học để admin phê duyệt bạn không thể chỉnh sửa khoa học cân nhắc trước khi làm điều đó">
            <button
              onClick={() => handleSubmitCourse(item._id)}
              className="w-full py-2 rounded-lg bg-primary text-white flex items-center justify-center text-sm"
            >
            {item.approve === 3 ? "Gửi đăng ký khóa học" : "Gửi lại khóa học"}  
            </button>
          </Tooltip>
        ) : null}
        {(item.approve === 3 || item.approve === 0) && (
          <button
            onClick={() => handleDeleteCourse(item._id)}
            className="w-full py-2 rounded-lg bg-rose-400 text-white flex items-center justify-center text-sm"
          >
            Xóa khóa học
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseTeacherPage;
