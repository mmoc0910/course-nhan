import  { useEffect, useState } from "react";
import CourseList from "./CourseList";
import { Category, CourseType } from "../../types";
import { api } from "../../api";

const RankSectionCourse = ({ rank }: { rank: Category }) => {
  const [courses, setCourse] = useState<CourseType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get(
          `/courses?status=1&approve=1&rank=${rank.id}`
        );
        setCourse(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (courses.length > 0)
    return <CourseList heading={rank.title} courses={courses} />;
  return;
};

export default RankSectionCourse;
