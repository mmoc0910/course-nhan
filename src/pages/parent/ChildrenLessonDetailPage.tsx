import { Link, useParams } from "react-router-dom";
import Logo from "../../components/logo/Logo";
import LessonMenuSideBar from "../../components/lesson/lesson-menu-sidebar/LessonMenuSideBar";
import { useEffect, useState } from "react";
import { Tab } from "../../components/tab/Tab";
import TabContent from "../../components/tab/TabContent";
import InfomationTab from "../../components/lesson/lesson-tabs/info-tab/InfomationTab";
import { CommentTab } from "../../components/lesson/lesson-tabs/comment-tab/CommentTab";
import { TestTab } from "../../components/lesson/lesson-tabs/test-tab/TestTab";
import DocumentTab from "../../components/lesson/lesson-tabs/document-tabs/DocumentTab";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { CourseType, LessonType } from "../../types";
import classNames from "../../utils/classNames";
import { api } from "../../api";
import LearningProcess from "../../components/common/LearningProcess";

const tabs = [
  { key: "info", title: "Thông tin" },
  { key: "document", title: "Tài liệu" },
  { key: "test", title: "Bài kiểm tra" },
  { key: "comment", title: "Bình luận" },
];
const ChildrenLessonDetailPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const { lessonId, courseId, studentId } = useParams();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<"a" | "b">("a");
  const [lesson, setLesson] = useState<LessonType>();
  const [lessonComplete, setLessonComplete] = useState<number>();
  const [course, setCourse] = useState<CourseType>();
  useEffect(() => {
    if (auth && courseId) {
      (async () => {
        try {
          const result = await api.get<CourseType>(`/courses/${courseId}`);
          setCourse(result.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);
  useEffect(() => {
    if (auth)
      (async () => {
        try {
          const result = await axiosPrivate.post<{ lastOrder: number }>(
            `/results/last-order`,
            {
              student: studentId,
              course: courseId,
            }
          );
          if (result.data) setLessonComplete(result.data.lastOrder);
        } catch (error) {
          console.log(error);
        }
      })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (auth) {
      (async () => {
        try {
          setLoading(true);
          const result = await axiosPrivate.get<LessonType>(
            `/lessons/${lessonId}`
          );
          setLesson(result.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);
  if (courseId && lessonId && auth && course && studentId)
    return (
      <div className="h-screen">
        <div className="flex relative">
          <div className="w-[420px] fixed">
            <div className="px-7 h-[80px] bg-[#f8f9ff] flex items-center gap-10 select-none">
              <p
                className={classNames(
                  "font-bold text-lg cursor-pointer transition-all duration-300",
                  tab === "a" ? "text-secondary" : "text-text4"
                )}
                onClick={() => setTab("a")}
              >
                Nội dung bài học
              </p>
              {auth.role === 4 || auth.role === 3 ? null : (
                <p
                  className={classNames(
                    "font-bold text-lg cursor-pointer transition-all duration-300",
                    tab === "b" ? "text-secondary" : "text-text4"
                  )}
                  onClick={() => setTab("b")}
                >
                  Quá trình
                </p>
              )}
            </div>
            <div className="max-h-[calc(100vh-80px)] overflow-y-scroll scroll-hidden">
              <LessonMenuSideBar
                course={course}
                lessonComplete={lessonComplete || 0}
                studentId={studentId}
                disabled={tab !== "a"}
              />
            </div>
          </div>
          <div className="ml-auto w-[calc(100%-420px)]">
            <div className="px-20 flex items-center justify-between bg-white h-[80px]">
              <Logo className="text-secondary" />
              <Link
                to={
                  auth && auth.role === 2
                    ? "/parent/list-child"
                    : auth.role === 4
                    ? "/admin/courses"
                    : auth.role === 3
                    ? "/teacher/my-courses"
                    : "/my-class"
                }
                className="flex items-center gap-2"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-secondary20"
                  >
                    <path d="M315.4 15.5C309.7 5.9 299.2 0 288 0s-21.7 5.9-27.4 15.5l-96 160c-5.9 9.9-6.1 22.2-.4 32.2s16.3 16.2 27.8 16.2H384c11.5 0 22.2-6.2 27.8-16.2s5.5-22.3-.4-32.2l-96-160zM288 312V456c0 22.1 17.9 40 40 40H472c22.1 0 40-17.9 40-40V312c0-22.1-17.9-40-40-40H328c-22.1 0-40 17.9-40 40zM128 512a128 128 0 1 0 0-256 128 128 0 1 0 0 256z" />
                  </svg>
                </span>
                <p className="font-medium text-lg">Trở về dashboard</p>
              </Link>
            </div>
            <div className="col-span-7 overflow-scroll scroll-hidden">
              <div className="px-20">
                {tab === "b" ? (
                  <LearningProcess
                    course={course}
                    courseId={course._id}
                    studentId={studentId}
                  />
                ) : (
                  <>
                    {!loading && lesson ? (
                      <Tab tabs={tabs}>
                        <TabContent>
                          <InfomationTab
                            title={lesson.title}
                            videoId={lesson.video}
                            description={lesson.description}
                          />
                        </TabContent>
                        <TabContent>
                          <DocumentTab
                            documents={
                              JSON.parse(lesson.pdf) as {
                                title: string;
                                url: string;
                              }[]
                            }
                          />
                        </TabContent>
                        <TabContent>
                          <TestTab
                            courseId={courseId}
                            test={lesson.test}
                            updateLessonComplete={(value) =>
                              setLessonComplete(value)
                            }
                            studentId={studentId}
                            isRate={false}
                          />
                        </TabContent>
                        <TabContent>
                          <CommentTab lessonId={lessonId} />
                        </TabContent>
                      </Tab>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return;
};

export default ChildrenLessonDetailPage;
