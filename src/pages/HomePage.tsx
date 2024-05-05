import { useEffect, useState } from "react";
import HomeBanner from "../components/banners/HomeBanner";
import CourseList from "../components/home/CourseList";
import Satify from "../components/home/Satify";
import MenuSidebar from "../components/sidebar/MenuSidebar";
import { CourseType } from "../types";
import { api } from "../api";
import { listCategory } from "../constanst";
import RankSectionCourse from "../components/home/RankSectionCourse";

const HomePage = () => {
  const [newCourses, setNewCourse] = useState<CourseType[]>([]);
  const [topCourses, setTopCourse] = useState<CourseType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const [{ data: dataNewCourses }, { data: dataTopCourse }] =
          await Promise.all([
            api.get<CourseType[]>(`/courses/new`),
            api.get<{ course: CourseType[] }[]>(`/subs/top`),
          ]);
        setNewCourse(dataNewCourses);
        setTopCourse(dataTopCourse.map((item) => item.course[0]));
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
      {newCourses.length > 0 && (
        <CourseList heading="Khóa học mới nhất" courses={newCourses} />
      )}
      {topCourses.length > 0 && (
        <CourseList heading="Khóa học bán chạy nhất" courses={topCourses} />
      )}
      {listCategory.map((item) => (
        <RankSectionCourse key={item.id} rank={item} />
      ))}
    </div>
  );
};

export default HomePage;
