import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "../../store/auth/authSlice";
import { RootState } from "../../store/configureStore";
import { getRoleLabel } from "../../constanst";
import { useToogleValue } from "../../hooks/useToogleValue";
import Logo from "../../components/logo/Logo";
import { useEffect, useRef } from "react";
import classNames from "../../utils/classNames";
import { IntroduceType } from "../../types";
import avatarDefault from "../../assets/images/avatar.png";

const SIDEBAR_WIDTH = 250;
const teacherMenus = [
  { title: "Thống kê", url: "/teacher/dashboard" },
  { title: "Đăng ký khóa học", url: "/teacher/courses" },
  { title: "Khóa học của tôi", url: "/teacher/my-courses" },
  { title: "Thông tin tài khoản", url: "/teacher/account" },
  { title: "Đổi mật khẩu", url: "/teacher/change-password" },
];
const adminMenus = [
  { title: "Thống kê", url: "/admin/dashboard" },
  { title: "Phê duyệt giáo viên", url: "/admin/approve-teachers" },
  { title: "Giáo viên", url: "/admin/teachers" },
  { title: "Học viên", url: "/admin/students" },
  { title: "Phụ huynh", url: "/admin/parents" },
  { title: "Phê duyệt khóa học", url: "/admin/approve-courses" },
  { title: "Khóa học", url: "/admin/courses" },
  { title: "Thông tin tài khoản", url: "/admin/account" },
  { title: "Đổi mật khẩu", url: "/admin/change-password" },
];
const LayoutDashboard = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const breadcumb = useSelector((state: RootState) => state.breadcumb);
  const dispatch = useDispatch();
  const { value } = useToogleValue(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const menus =
    auth?.role === 4 ? adminMenus : auth?.role === 3 ? teacherMenus : [];
  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/sign-in");
  };
  useEffect(() => {
    if (headerRef.current && contentRef.current) {
      const windowHeight = window.innerHeight;
      const headerHeight = headerRef.current.clientHeight;
      contentRef.current.style.height = `${windowHeight - headerHeight - 60}px`;
    }
  }, []);

  if (auth) {
    const info = auth?.description
      ? (JSON.parse(auth.description) as IntroduceType)
      : undefined;
    return (
      <div className="w-screen h-screen overflow-hidden select-none">
        <div
          className="px-10 py-5 flex items-center bg-[#f7f7f9] border-b border-b-border-gray"
          ref={headerRef}
        >
          <div className="flex items-center gap-5 flex-1">
            <div className="font-semibold text-lg">
              {breadcumb.map((item, index) => (
                <span key={index}>
                  <Link to={item.url} className="cursor-pointer">
                    {item.title}
                  </Link>
                  {breadcumb.length > 1 && index < breadcumb.length - 1 && (
                    <span> / </span>
                  )}
                </span>
              ))}
            </div>
          </div>
          <Logo />
          <div className="flex items-center justify-end gap-5 flex-1">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={info ? info.avatarURL : avatarDefault}
              />
              <div className="">
                <p className="font-semibold">{auth.username}</p>
                <p className="text-text3 text-sm">{getRoleLabel(auth.role)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-10 pb-0 flex items-start gap-5">
          <div
            className={classNames(
              "rounded-xl transition-all duration-150 overflow-hidden flex flex-col font-medium",
              value ? "border border-border-gray" : "opacity-0 invisible"
            )}
            style={{ width: value ? SIDEBAR_WIDTH : 0 }}
          >
            {menus.map((item) => (
              <NavLink
                // onClick={() => handleToogleValue()}
                to={item.url}
                className={({ isActive }) =>
                  classNames(
                    "px-7 py-3 flex items-center gap-2 cursor-pointer first:rounded-tl-xl first:rounded-tr-xl hover:bg-strock transition-all duration-200",
                    isActive ? "bg-strock" : ""
                  )
                }
              >
                {item.title}
              </NavLink>
            ))}
            <div
              onClick={handleSignOut}
              className="px-7 py-3 flex items-center gap-2 cursor-pointer rounded-br-xl rounded-bl-xl hover:bg-strock transition-all duration-200"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 fill-current"
                >
                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                </svg>
              </span>
              <span className="shrink-0">Đăng xuất</span>
            </div>
          </div>
          <div
            className="rounded-xl flex-1 border border-border-gray p-10 transition-all duration-300 overflow-y-scroll scroll-hidden"
            ref={contentRef}
          >
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    );
  }
  return;
};

export default LayoutDashboard;
