import { useLocation } from "react-router-dom";
import Heading from "../components/common/Heading";
import { useEffect, useState } from "react";
import { CourseType } from "../types";
import { api } from "../api";
import CourseItem from "../components/course/CourseItem";

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get("key");
  console.log("key - ", key);
  const [courses, setCourese] = useState<CourseType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get<CourseType[]>(`/courses?title=${key}`);
        setCourese(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [key]);
  return (
    <div className="container mt-5 space-y-10">
      <Heading>Kết quả tìm kiếm của từ khóa "{key}"</Heading>
      {courses.length > 0 ? (
        <div className="grid grid-cols-5 gap-x-5 gap-y-10">
          {courses.map((item) => (
            <CourseItem course={item} key={item._id} />
          ))}
        </div>
      ) : (
        <p className="mt-20 text-center text-secondary">Không tìm thấy kết quả nào phù hợp.</p>
      )}
    </div>
  );
};

export default SearchPage;
