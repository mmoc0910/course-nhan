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
// import LayoutUser from "./layouts/layouts/LayoutUser";
const HomePage = lazy(() => import("./pages/HomePage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const LessonDetailPage = lazy(() => import("./pages/user/LessonDetailPage"));
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
const ApproveCourseAdmin = lazy(() => import("./pages/admin/ApproveCourseAdmin"));

function App() {
  const { auth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
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
            <Route path="/course/:courseId" element={<CourseDetailPage />} />
            <Route path="/account" element={<AcoountUserPage />} />
            <Route path="/parent/child" element={<ChildPage />} />
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
            <Route path="/admin/approve-courses" element={<ApproveCourseAdmin />} />
            <Route path="/teacher/account" element={<AcoountUserPage />} />
          </Route>
          <Route
            path="/course/:courseId/lesson/:lessonSlug"
            element={<LessonDetailPage />}
          />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
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
