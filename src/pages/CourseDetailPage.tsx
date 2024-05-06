import { Link, useNavigate, useParams } from "react-router-dom";
import CourseTeacher from "../components/course/CourseTeacher";
import CourseContent from "../components/course/CourseContent";
import CourseRelated from "../components/course/CourseRelated";
import { Tab } from "../components/tab/Tab";
import TabContent from "../components/tab/TabContent";
import { ReactNode, useEffect, useState } from "react";
import { CourseDetailType, LessonType, SubType } from "../types";
import { api } from "../api";
import dayjs from "dayjs";
import { VND } from "../constanst";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Chevron from "../icons/Chevron";
import { toast } from "react-toastify";
import axios from "axios";
import { PayPalButtons } from "@paypal/react-paypal-js";
import RateCourse from "../components/course/RateCourse";

const tabs = [
  { title: "Nội dung học tập", key: "content" },
  { title: "Giáo viên giảng dạy", key: "teacher" },
  { title: " Khóa học liên quan", key: "related" },
  { title: "Đánh giá", key: "rate" },
];
const CourseDetailPage = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const { courseId } = useParams();
  const [course, setCourse] = useState<CourseDetailType>();
  const [listSub, setListSub] = useState<SubType[]>([]);
  useEffect(() => {
    fetchSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchSub = async () => {
    if (auth && auth.role === 1)
      try {
        const result = await axiosPrivate.get<SubType[]>(
          `/subs?student=${auth._id}&course=${courseId}`
        );
        setListSub(result.data);
      } catch (error) {
        console.log(error);
      }
  };
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
  const handleCreateSub = async ({
    course,
    parent,
    student,
  }: {
    parent?: string;
    course: string;
    student: string;
  }) => {
    if (auth)
      try {
        let body;
        if (parent) body = { parent, course, student };
        else body = { course, student };
        await axiosPrivate.post(`/subs`, body);
        fetchSub();
        toast("Success");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error);
          toast(error.response?.data.message);
          // navigate("/parent/child");
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
  };
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
            {/* <div className="flex items-center gap-2 px-5 py-2 rounded-full w-fit text-white font-medium bg-primary20">
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
            </div> */}
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
            </div>
            <div className="col-span-4">
              <p>{description}</p>
              <p className="mb-4 text-lg font-medium text-primary mt-5">
                Học trọn gói chỉ với
              </p>
              <div className="flex items-center">
                <p className="text-2xl font-semibold">
                  {VND.format(course.price)} USD
                </p>
              </div>
              <div className="mt-5 flex items-center gap-5">
                {listSub.length > 0 ? (
                  <ButtonGoLesson courseId={course._id}>
                    Chi tiết khóa học
                  </ButtonGoLesson>
                ) : (
                  <>
                    {!auth ? (
                      <Link
                        to={`/sign-in`}
                        className="rounded-lg px-4 py-2 flex items-center justify-center bg-primary text-white font-medium"
                      >
                        Đăng ký khóa học
                      </Link>
                    ) : auth.role === 1 ? (
                      <div className="flex items-center gap-5">
                        <p className="font-semibold">Thanh toán với Paypal</p>
                        <PayPalButtons
                          onClick={(_data, actions) => {
                            if (!auth) {
                              navigate("/sign-in");
                              return actions.reject();
                            }
                            return actions.resolve();
                          }}
                          style={{ layout: "horizontal", height: 35 }}
                          createOrder={(_data, actions) => {
                            return actions.order.create({
                              intent: "CAPTURE",
                              purchase_units: [
                                {
                                  description: course.title,
                                  amount: {
                                    value: `${course.price}`,
                                    currency_code: "USD",
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={async (_data, action) => {
                            const order = action.order?.capture();
                            console.log("order - ", order);
                            auth &&
                              handleCreateSub({
                                course: course._id,
                                student: auth._id,
                              });
                          }}
                        />
                      </div>
                    ) : auth.role === 2 ? (
                      <ButtonPayment
                        courseId={course._id}
                        amount={`${course.price}`}
                        description={course.title}
                        fetchSub={fetchSub}
                      />
                    ) : auth.role === 4 ||
                      (auth.role === 3 && auth._id === course.teacher._id) ? (
                      <ButtonGoLesson courseId={course._id}>
                        Chi tiết khóa học
                      </ButtonGoLesson>
                    ) : null}
                  </>
                )}
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
                <CourseTeacher teacher={course.teacher} />
              </TabContent>
              <TabContent>
                <CourseRelated course={course} />
              </TabContent>
              <TabContent>
                <RateCourse courseId={course._id} />
              </TabContent>
            </Tab>
          </div>
        </div>
      </div>
    );
  }
  return;
};

const ButtonPayment = ({
  amount,
  description,
  fetchSub,
  courseId,
}: {
  amount: string;
  description: string;
  fetchSub: () => void;
  courseId: string;
}) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const children = useSelector((state: RootState) => state.children);
  const [selectChildren, setSelectChildren] = useState<string>();
  const handleCreateSub = async ({
    course,
    parent,
    student,
  }: {
    parent: string;
    course: string;
    student: string;
  }) => {
    if (auth)
      try {
        await axiosPrivate.post(`/subs`, { parent, course, student });
        fetchSub();
        toast("Success");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error);
          toast(error.response?.data.message);
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
  };
  const handleSelectChildren = async (studentId: string) => {
    try {
      const result = await axiosPrivate.get<SubType[]>(
        `/subs?student=${studentId}&course=${courseId}`
      );
      if (result.data.length === 0) setSelectChildren(studentId);
      else toast("Bạn đã đăng ký khóa học này cho con trước đó");
    } catch (error) {
      console.log(error);
    }
  };
  if (auth)
    return (
      <div className="space-y-5">
        <div className="relative group w-max">
          <div className="rounded-lg flex items-center gap-5 px-4 py-2 bg-thirth text-white font-medium cursor-pointer">
            <span>
              {selectChildren
                ? children.find((item) => item._id === selectChildren)?.name
                : "Đăng ký ngay"}
            </span>{" "}
            <Chevron type="down" />
          </div>
          <div className="absolute z-30 min-w-full left-0 top-[calc(100%+2rem)] group-hover:top-full transition-all duration-300 invisible opacity-0 group-hover:visible group-hover:opacity-100">
            <ul className="mt-1">
              {children.map((item) => (
                <li
                  onClick={() => handleSelectChildren(item._id)}
                  className="px-5 cursor-pointer py-2 first:rounded-tl-lg first:rounded-tr-lg last:rounded-bl-lg last:rounded-br-lg bg-thirth text-white"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {selectChildren ? (
          <div className="flex items-center gap-5">
            <p className="font-semibold">Thanh toán với Paypal</p>
            <PayPalButtons
              onClick={(_data, actions) => {
                if (!auth) {
                  navigate("/sign-in");
                  return actions.reject();
                }
                return actions.resolve();
              }}
              style={{ layout: "horizontal", height: 35 }}
              createOrder={(_data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      description,
                      amount: { value: amount, currency_code: "USD" },
                    },
                  ],
                });
              }}
              onApprove={async (_data, action) => {
                const order = action.order?.capture();
                console.log("order - ", order);
                handleCreateSub({
                  course: courseId,
                  student: selectChildren,
                  parent: auth._id,
                });
              }}
            />
          </div>
        ) : null}
      </div>
    );
};

const ButtonGoLesson = ({
  children,
  courseId,
}: {
  children: ReactNode;
  courseId: string;
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [firstLessonId, setFirstLessonId] = useState<string>();
  useEffect(() => {
    (async () => {
      if (auth)
        try {
          const result = await axiosPrivate.get<LessonType[]>(
            `/lessons?course=${courseId}`
          );
          if (result.data.length > 0) setFirstLessonId(result.data[0]._id);
        } catch (error) {
          console.log(error);
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (firstLessonId)
    return (
      <Link
        to={`/course/${courseId}/lesson/${firstLessonId}`}
        className="rounded-lg px-4 py-2 flex items-center justify-center bg-primary text-white font-medium"
      >
        {children}
      </Link>
    );
  return;
};

export default CourseDetailPage;
