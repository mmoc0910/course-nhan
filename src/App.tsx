import "swiper/css";
import "swiper/css/pagination";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LayoutCommon from "./layouts/layouts/LayoutCommon";
import LayoutDashboard from "./layouts/layouts/LayoutDashboard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/configureStore";
import { api } from "./api";
import { AuthType } from "./types";
import { signIn } from "./store/auth/authSlice";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { setChildren } from "./store/auth/children/childrenSlice";
// import LayoutUser from "./layouts/layouts/LayoutUser";
const HomePage = lazy(() => import("./pages/HomePage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const LessonDetailPage = lazy(() => import("./pages/user/LessonDetailPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const DashboardTeacherPage = lazy(
  () => import("./pages/teacher/DashboardTeacherPage")
);
const CourseTeacherPage = lazy(
  () => import("./pages/teacher/CourseTeacherPage")
);
const AddCourseTeacherPage = lazy(
  () => import("./pages/teacher/AddCourseTeacherPage")
);
const AddLessonTeacherPage = lazy(
  () => import("./pages/teacher/AddLessonTeacherPage")
);
const LessonTeacherPage = lazy(
  () => import("./pages/teacher/LessonTeacherPage")
);
const EditLessonTeacherPage = lazy(
  () => import("./pages/teacher/EditLessonTeacherPage")
);
const EditCourseTeacherPage = lazy(
  () => import("./pages/teacher/EditCourseTeacherPage")
);
const AddTestTeacherPage = lazy(
  () => import("./pages/teacher/AddTestTeacherPage")
);
const AcoountUserPage = lazy(() => import("./pages/user/AcoountUserPage"));
const EditTestTeacherPage = lazy(
  () => import("./pages/teacher/EditTestTeacherPage")
);
const DashboardAdmin = lazy(() => import("./pages/admin/DashboardAdmin"));
const TeacherAdmin = lazy(() => import("./pages/admin/TeacherAdmin"));
const CourseAdmin = lazy(() => import("./pages/admin/CourseAdmin"));
const ChildPage = lazy(() => import("./pages/parent/ChildPage"));
const ApproveTeacher = lazy(() => import("./pages/admin/ApproveTeacher"));
const ApproveCourseAdmin = lazy(
  () => import("./pages/admin/ApproveCourseAdmin")
);
const MyClassPage = lazy(() => import("./pages/user/MyClassPage"));
const ChildrenClassPage = lazy(
  () => import("./pages/parent/ChildrenClassPage")
);
const ChildrenLessonDetailPage = lazy(
  () => import("./pages/parent/ChildrenLessonDetailPage")
);
const SearchPage = lazy(() => import("./pages/SearchPage"));
const StudentAdminPage = lazy(() => import("./pages/admin/StudentAdminPage"));
const ParentAdminPage = lazy(() => import("./pages/admin/ParentAdminPage"));
const MyCoursePage = lazy(() => import("./pages/teacher/MyCoursePage"));
const ListChilrenPage = lazy(() => import("./pages/parent/ListChilrenPage"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const CommunityStandardPage = lazy(() => import("./pages/CommunityStandardPage"));

function App() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        if (auth && auth.role === 2) {
          const result = await axiosPrivate.get<AuthType>(`/users/${auth._id}`);
          dispatch(setChildren(result.data.children));
        }
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  useEffect(() => {
    if (auth) {
      (async () => {
        try {
          const result = await api.get<AuthType>(`/users/${auth._id}`, {
            headers: { Authorization: auth.accessToken },
          });
          const { description, email, name } = result.data;
          dispatch(signIn({ auth: { ...auth, description, email, name } }));
        } catch (error) {
          console.log(error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect;
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-screen h-screen">
            loading
          </div>
        }
      >
        <Routes>
          <Route element={<LayoutCommon />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/community-standard" element={<CommunityStandardPage />} />
            <Route path="/course/:courseId" element={<CourseDetailPage />} />
            <Route path="/account" element={<AcoountUserPage />} />
            <Route path="/parent/child" element={<ChildPage />} />
            <Route path="/parent/list-child" element={<ListChilrenPage />} />
            <Route path="/category/:subjectId" element={<CategoryPage />} />
            <Route path="/my-class" element={<MyClassPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route
              path="/children/:childrenId"
              element={<ChildrenClassPage />}
            />
            <Route path="/change-password" element={<ChangePasswordPage />} />
          </Route>
          <Route element={<LayoutDashboard />}>
            <Route
              path="/teacher/dashboard"
              element={<DashboardTeacherPage />}
            />
            <Route path="/teacher/courses" element={<CourseTeacherPage />} />
            <Route
              path="/teacher/courses/add-course"
              element={<AddCourseTeacherPage />}
            />
            <Route
              path="/teacher/courses/add-course/:courseId"
              element={<EditCourseTeacherPage />}
            />
            <Route
              path="/teacher/courses/add-lesson/:orderNumber/:courseId"
              element={<AddLessonTeacherPage />}
            />
            <Route
              path="/teacher/courses/edit-lesson/:lessonId"
              element={<EditLessonTeacherPage />}
            />
            <Route
              path="/teacher/courses/lessons/:courseId"
              element={<LessonTeacherPage />}
            />
            <Route
              path="/teacher/courses/:courseId/lessons/add-test/:lessonId"
              element={<AddTestTeacherPage />}
            />
            <Route
              path="/teacher/courses/:courseId/lessons/:lessonId/edit-test/:testId"
              element={<EditTestTeacherPage />}
            />
            <Route path="/teacher/my-courses" element={<MyCoursePage />} />
            {/* <Route
              path="/account"
              element={<AcoountUserPage />}
            /> */}
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
            <Route path="/admin/teachers" element={<TeacherAdmin />} />
            <Route path="/admin/account" element={<AcoountUserPage />} />
            <Route
              path="/admin/approve-teachers"
              element={<ApproveTeacher />}
            />
            <Route path="/admin/courses" element={<CourseAdmin />} />
            <Route path="/admin/students" element={<StudentAdminPage />} />
            <Route path="/admin/parents" element={<ParentAdminPage />} />
            <Route
              path="/admin/approve-courses"
              element={<ApproveCourseAdmin />}
            />
            <Route path="/teacher/account" element={<AcoountUserPage />} />
            <Route
              path="/teacher/change-password"
              element={<ChangePasswordPage />}
            />
            <Route
              path="/admin/change-password"
              element={<ChangePasswordPage />}
            />
          </Route>
          <Route
            path="/course/:courseId/lesson/:lessonId"
            element={<LessonDetailPage />}
          />
          <Route
            path="/student/:studentId/course/:courseId/lesson/:lessonId"
            element={<ChildrenLessonDetailPage />}
          />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center w-screen h-screen text-3xl font-semibold">
                404 Page Not Found
              </div>
            }
          />
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
