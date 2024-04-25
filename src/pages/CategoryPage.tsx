import { useParams } from "react-router-dom";
import MenuSidebar from "../components/sidebar/MenuSidebar";
import { useEffect, useState } from "react";
import { CourseType } from "../types";
import { api } from "../api";
import CourseItem from "../components/course/CourseItem";

const CategoryPage = () => {
  const { subjectId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await api.get(`/courses?subject=${subjectId}`);
        setCourses(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [subjectId]);
  return (
    <div className="container grid grid-cols-10 gap-10">
      <div className="col-span-3">
        <MenuSidebar />
      </div>
      <div className="col-span-7">
        {courses.length > 0 && (
          <div className="grid grid-cols-3 gap-5">
            {courses.map((item) => (
              <CourseItem key={item._id} course={item} />
            ))}
          </div>
        )}
        {!loading && courses.length === 0 && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-xl text-center text-secondary">
              Chưa có khóa học nào được thêm.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
