import "swiper/css";
import "swiper/css/pagination";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LayoutCommon from "./layouts/layouts/LayoutCommon";
import LayoutUser from "./layouts/layouts/LayoutAdmin";
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
const AcoountUserPage = lazy(
  () => import("./pages/user/AcoountUserPage")
);
const EditTestTeacherPage = lazy(
  () => import("./pages/teacher/EditTestTeacherPage")
);

function App() {
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
          </Route>
          <Route element={<LayoutUser />}>
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
            <Route
              path="/account"
              element={<AcoountUserPage />}
            />
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
