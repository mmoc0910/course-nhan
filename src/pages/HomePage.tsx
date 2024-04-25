import { useEffect, useState } from "react";
import HomeBanner from "../components/banners/HomeBanner";
import CourseList from "../components/home/CourseList";
import Satify from "../components/home/Satify";
import MenuSidebar from "../components/sidebar/MenuSidebar";
import { CourseType } from "../types";
import { api } from "../api";

const HomePage = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  console.log("course - ", courses);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get<CourseType[]>(`/courses?approve=1`);
        console.log("result - ", result.data);
        setCourses(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="">
      <div className="container grid grid-cols-10 gap-5">
        <div className="col-span-3">
          <MenuSidebar />
        </div>
        <div className="col-span-5">
          <HomeBanner />
        </div>
        <div className="col-span-2">
          <img
            className="w-full h-full object-cover rounded-xl"
            src="https://images.unsplash.com/photo-1516381548400-349d680edb56?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
      <Satify />
      <CourseList
        heading="Tiểu học"
        courses={courses.filter((item) => item.rank === 1)}
      />
      <CourseList
        heading="Trung học cơ sở"
        courses={courses.filter((item) => item.rank === 20)}
      />
      <CourseList
        heading="Trung học phổ thông"
        courses={courses.filter((item) => item.rank === 48)}
      />
    </div>
  );
};

export default HomePage;
