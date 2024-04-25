import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { CourseType } from "../../types";
import Heading from "../../components/common/Heading";
import { Courseitem } from "./CourseTeacherPage";
import { setBreadcumb } from "../../store/breadcumb/breadcumbSlice";

const MyCoursePage = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [courses, setCourses] = useState<CourseType[]>([]);
  useEffect(() => {
    dispatch(
      setBreadcumb([
        {
          title: "Khóa học của tôi",
          url: "/teacher/my-courses",
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
          `/courses?teacher=${auth._id}&status=1&approve=1`
        );
        console.log("result - ", result.data);
        setCourses(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-10">
      <Heading>Khóa học của tôi</Heading>
      <div className="grid grid-cols-4 gap-x-5 gap-y-10 pb-10">
        {courses.map((item) => (
          <Courseitem
            key={item._id}
            item={item}
            handleSubmitCourse={() => {}}
            message={false}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCoursePage;
