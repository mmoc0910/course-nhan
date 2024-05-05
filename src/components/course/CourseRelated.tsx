import { FC, useEffect, useState } from "react";
import { CourseDetailType, CourseType } from "../../types";
import CourseList from "../home/CourseList";
import { Link } from "react-router-dom";
import { api } from "../../api";

type CourseRelatedProps = { course: CourseDetailType };
const CourseRelated: FC<CourseRelatedProps> = ({ course }) => {
  const [relatedCourses, setRelatedCourses] = useState<CourseType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { subject, _id } = course;
        const result = await api.get<CourseType[]>(
          `/courses?subject=${subject}&status=1`
        );
        setRelatedCourses(result.data.filter((item) => item._id !== _id));
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course._id]);
  if (relatedCourses.length > 0) return <CourseList courses={relatedCourses} />;
  return (
    <p className="text-xl text-center mt-5">
      Không có khóa học nào.{" "}
      <Link to={"/"} className="text-secondary underline">
        Xem thêm
      </Link>
    </p>
  );
};

export default CourseRelated;
