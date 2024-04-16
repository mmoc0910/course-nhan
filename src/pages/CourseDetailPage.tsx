import { Link, useParams } from "react-router-dom";
import CourseTeacher from "../components/course/CourseTeacher";
import CourseContent from "../components/course/CourseContent";
import CourseRelated from "../components/course/CourseRelated";
import CourseQuestion from "../components/course/CourseQuestion";
import { Tab } from "../components/tab/Tab";
import TabContent from "../components/tab/TabContent";
import { CommentTab } from "../components/lesson/lesson-tabs/comment-tab/CommentTab";
import { useEffect, useState } from "react";
import { CourseDetailType } from "../types";
import { api } from "../api";
import dayjs from "dayjs";
import { VND } from "../constanst";

const tabs = [
  { title: "Nội dung học tập", key: "content" },
  { title: "Giáo viên giảng dạy", key: "teacher" },
  { title: " Khóa học liên quan", key: "related" },
  { title: "Đánh giá", key: "rate" },
  { title: " Q&A", key: "qa" },
];
const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<CourseDetailType>();
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get<CourseDetailType>(`/courses/${courseId}`);
        setCourse(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [courseId]);
  if (course) {
    const { courseObjectives, description } = JSON.parse(
      course.description
    ) as {
      description: string;
      courseObjectives: string;
    };
    return (
      <div className="">
        <div className="container py-10">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 px-5 py-2 rounded-full w-fit text-white font-medium bg-primary20">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 fill-white"
                >
                  <path d="M219.3 .5c3.1-.6 6.3-.6 9.4 0l200 40C439.9 42.7 448 52.6 448 64s-8.1 21.3-19.3 23.5L352 102.9V160c0 70.7-57.3 128-128 128s-128-57.3-128-128V102.9L48 93.3v65.1l15.7 78.4c.9 4.7-.3 9.6-3.3 13.3s-7.6 5.9-12.4 5.9H16c-4.8 0-9.3-2.1-12.4-5.9s-4.3-8.6-3.3-13.3L16 158.4V86.6C6.5 83.3 0 74.3 0 64C0 52.6 8.1 42.7 19.3 40.5l200-40zM111.9 327.7c10.5-3.4 21.8 .4 29.4 8.5l71 75.5c6.3 6.7 17 6.7 23.3 0l71-75.5c7.6-8.1 18.9-11.9 29.4-8.5C401 348.6 448 409.4 448 481.3c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-71.9 47-132.7 111.9-153.6z" />
                </svg>
              </span>
              <p>666 đang học</p>
            </div>
            <p className="text-3xl font-medium">{course.title}</p>
          </div>
          <div className="flex items-center gap-20 py-5">
            <p className="">
              Giáo viên:{" "}
              <Link to={"/"} className="font-medium text-primary">
                {course.teacher.name}
              </Link>
            </p>
            <p className="">
              Cập nhật:{" "}
              <span className="font-medium text-primary">
                {dayjs(course.updatedAt).format("DD/MM/YYYY")}
              </span>
            </p>
          </div>
          <div className="pt-5 pb-10 grid grid-cols-10 gap-10">
            <div className="col-span-6">
              <img
                src={course.poster}
                className="w-full aspect-video object-cover"
              />
              {/* <video
                controls
                controlsList="nodownload"
                // poster={activeEpisode.poster}
                
              >
                <source
                  src={
                    "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/1080.mp4"
                  }
                  type="video/mp4"
                />
              </video> */}
            </div>
            <div className="col-span-4">
              <p>{description}</p>
              <p className="mb-4 text-lg font-medium text-primary mt-5">
                Học trọn gói chỉ với
              </p>
              <div className="flex items-center">
                <p className="text-xl font-semibold">
                  {VND.format(course.price)} VND
                </p>
                {/* <p className="text-base font-semibold text-error line-through decoration-error">
                  1.200.000 VND
                </p> */}
              </div>
              <div className="mt-5 flex items-center gap-5">
                {/* <button className="rounded-lg px-4 py-2 flex items-center justify-center bg-thirth text-white font-medium">
                  Học thử miễn phí
                </button> */}
                <button
                  className="rounded-lg px-4 py-2 flex items-center justify-center bg-thirth text-white font-medium"
                  //  className="rounded-lg px-4 py-2 flex items-center justify-center font-medium border border-primary text-primary"
                >
                  Đăng ký ngay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-t-border-gray">
          <div className="container">
            <Tab
              tabs={tabs}
              classNameTabItem="pb-3 pt-7"
              classNameWrapperContent="!pt-10"
              colorTab="#1DC071"
            >
              <TabContent>
                <CourseContent
                  listLesson={course.listLesson}
                  courseObjectives={courseObjectives}
                />
              </TabContent>
              <TabContent>
                <CourseTeacher teacher={course.teacher } />
              </TabContent>
              <TabContent>
                <CourseRelated />
              </TabContent>
              <TabContent>
                <CommentTab />
              </TabContent>
              <TabContent>
                <CourseQuestion />
              </TabContent>
            </Tab>
          </div>
        </div>
        {/* <div className="container pt-10 pb-20">
        {activeTab === "content" ?  : null}
        {activeTab === "teacher" ? <CourseTeacher /> : null}
        {activeTab === "related" ? <CourseRelated /> : null}
        {activeTab === "qa" ? <CourseQuestion /> : null}
      </div> */}
      </div>
    );
  }
  return;
};

export default CourseDetailPage;
