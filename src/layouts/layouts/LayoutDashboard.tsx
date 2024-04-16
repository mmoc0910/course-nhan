import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "../../store/auth/authSlice";
import { RootState } from "../../store/configureStore";
import { getRoleLabel } from "../../constanst";
import { useToogleValue } from "../../hooks/useToogleValue";
import Logo from "../../components/logo/Logo";
import { useEffect, useRef } from "react";
import classNames from "../../utils/classNames";

const SIDEBAR_WIDTH = 300;
const teacherMenus = [
  { title: "Dashboard", url: "/teacher/dashboard" },
  { title: "Khóa học", url: "/teacher/courses" },
  { title: "Tài khoản của tôi", url: "/account" },
];
const adminMenus = [
  { title: "Dashboard", url: "/admin/dashboard" },
  { title: "Giáo viên", url: "/admin/teachers" },
  { title: "Khóa học", url: "/admin/courses" },
];
const parentMenus = [
  { title: "Thêm tài khoản cho con", url: "/parent/child" },
  { title: "Tài khoản của tôi", url: "/account" },
];
const studentMenus = [{ title: "Tài khoản của tôi", url: "/account" }];
const LayoutDashboard = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { value, handleToogleValue } = useToogleValue();
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const menus =
    auth?.role === 4
      ? adminMenus
      : auth?.role === 3
      ? teacherMenus
      : auth?.role === 2
      ? parentMenus
      : studentMenus;
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
  if (auth)
    return (
      <div className="w-screen h-screen overflow-hidden select-none">
        <div
          className="px-10 py-5 flex items-center bg-[#efefef]"
          ref={headerRef}
        >
          <div className="flex items-center gap-5 flex-1">
            <div
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer"
              onClick={handleToogleValue}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 fill-current"
                >
                  <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                </svg>
              </span>
            </div>
            <div className="space-x-2 font-semibold text-lg">
              <span className="text-text4 cursor-pointer">
                Lorem, ipsum dolor
              </span>
              <span>/</span>
              <span className="cursor-pointer">Lorem ipsum dolor sit amet</span>
            </div>
          </div>
          <Logo />
          <div className="flex items-center justify-end gap-5 flex-1">
            <Link
              to={auth.role === 3 ? "/admin/dashboard" : "/"}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-slate-400" />
              <div className="">
                <p className="font-semibold">{auth.username}</p>
                <p className="text-text3 text-sm">{getRoleLabel(auth.role)}</p>
              </div>
            </Link>
            <div
              onClick={handleSignOut}
              className="px-5 py-2 rounded-lg border bg-secondary40 text-white flex items-center gap-2 cursor-pointer"
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
              <span>Đăng xuất</span>
            </div>
          </div>
        </div>
        <div className="p-10 pb-0 flex items-start gap-5">
          <div
            className={classNames(
              "rounded-xl transition-all duration-300 overflow-hidden flex flex-col gap-5 font-medium",
              value ? "border border-border-gray p-5" : "opacity-0 invisible"
            )}
            style={{ width: value ? SIDEBAR_WIDTH : 0 }}
          >
            {menus.map((item) => (
              <NavLink
                onClick={() => handleToogleValue()}
                to={item.url}
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "font-bold text-lg transition-all duration-200"
                      : ""
                  )
                }
              >
                {item.title}
              </NavLink>
            ))}
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
  return;
};

export default LayoutDashboard;
