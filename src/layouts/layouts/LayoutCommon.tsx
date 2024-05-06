import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../components/logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { signOut } from "../../store/auth/authSlice";
import { getRoleLabel } from "../../constanst";
import classNames from "../../utils/classNames";
import { IntroduceType } from "../../types";
import avatarDefault from "../../assets/images/avatar.png";
import { useState } from "react";

const adminMenus = [{ title: "Đến trang quản lý", url: "/admin/dashboard" }];

const teacherMenus = [
  { title: "Đến trang quản lý", url: "/teacher/dashboard" },
];

const parentMenus = [
  { title: "Tài khoản của con", url: "/parent/list-child" },
  { title: "Thêm tài khoản cho con", url: "/parent/child" },
  { title: "Thông tin tài khoản", url: "/account" },
  { title: "Đổi mật khẩu", url: "/change-password" },
];

const studentMenus = [
  { title: "Khóa học của tôi", url: "/my-class" },
  { title: "Thông tin tài khoản", url: "/account" },
  { title: "Đổi mật khẩu", url: "/change-password" },
];

const LayoutCommon = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/sign-in");
  };
  const menus = auth?.role
    ? auth.role === 1
      ? studentMenus
      : auth.role === 2
      ? parentMenus
      : auth.role === 3
      ? teacherMenus
      : adminMenus
    : [];
  const info = auth?.description
    ? (JSON.parse(auth.description) as IntroduceType)
    : undefined;
  return (
    <div className="">
      <div className="shadow-sm">
        <div className="flex items-center justify-between py-5 container">
          <div className="flex items-center gap-5">
            <Logo />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/search?key=${search}`);
              }}
              className="relative flex items-center"
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-strock rounded-lg pl-5 pr-14 py-2 min-w-60 font-light outline-none"
                placeholder="Tìm kiếm khóa học..."
              />
              <span
                className="absolute right-5 text-primary"
                onClick={() => navigate(`/search?key=${search}`)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </span>
            </form>
          </div>
          <div className="items-center flex gap-5">
            <div className="flex items-center gap-2 text-primary">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>+79533733420</span>
            </div>
            {auth ? (
              <>
                <div className="relative group">
                  <div className="absolute w-max z-50 top-[calc(100%+20px)] right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:top-full transition-all duration-300">
                    <div className="mt-3 bg-white shadow-xl rounded-xl border border-border-gray">
                      {menus.map((item, index) => (
                        <NavLink
                          key={index}
                          to={item.url}
                          className={({ isActive }) =>
                            classNames(
                              "px-7 py-2 flex items-center gap-2 cursor-pointer first:rounded-tl-xl first:rounded-tr-xl hover:bg-strock transition-all duration-200",
                              isActive ? "bg-strock" : ""
                            )
                          }
                        >
                          <span className="shrink-0">{item.title}</span>
                        </NavLink>
                      ))}
                      <div
                        onClick={handleSignOut}
                        className="px-7 py-2 flex items-center gap-2 cursor-pointer rounded-br-xl rounded-bl-xl hover:bg-strock transition-all duration-200"
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
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={info ? info.avatarURL : avatarDefault}
                    />
                    <div className="">
                      <p className="font-semibold">{auth.name}</p>
                      <p className="text-text3 text-sm">
                        {getRoleLabel(auth.role)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* <div
                  onClick={handleSignOut}
                  className="px-5 py-2 rounded-lg border bg-thirth text-white flex items-center gap-2 cursor-pointer"
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
                </div> */}
              </>
            ) : (
              <>
                <Link
                  to={"/sign-in"}
                  className="px-5 py-2 rounded-lg border border-icon-color text-icon-color"
                >
                  Đăng nhập
                </Link>
                <Link
                  to={"/sign-up"}
                  className="px-5 py-2 rounded-lg border bg-thirth text-white"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 py-3 container">
        <Link
          to={"/"}
          className="text-icon-color hover:text-black transition-all duration-300 hover:underline"
        >
          Giới thiệu
        </Link>
        <Link
          to={"/"}
          className="text-icon-color hover:text-black transition-all duration-300 hover:underline"
        >
          Giáo viên
        </Link>
        <Link
          to={"/"}
          className="text-icon-color hover:text-black transition-all duration-300 hover:underline"
        >
          Hướng nghiệp
        </Link>
        <Link
          to={"/"}
          className="text-icon-color hover:text-black transition-all duration-300 hover:underline"
        >
          Hướng dẫn đăng ký học
        </Link>
        <Link
          to={"/"}
          className="text-icon-color hover:text-black transition-all duration-300 hover:underline"
        >
          Hỗ trợ
        </Link>
        <Link
          to={"/community-standard"}
          className="text-icon-color hover:text-black transition-all duration-300 hover:underline"
        >
          Tiêu chuẩn cộng đồng
        </Link>
      </div>
      <div className="pb-20">
        <Outlet></Outlet>
      </div>
      <div className="bg-[url(https://kt.city/static/footer-bg.png)] bg-no-repeat bg-cover">
        <div className="container grid grid-cols-4 py-10">
          <div className="col-span-1 space-y-5">
            <p className="font-bold text-xl uppercase">Về Otlichno</p>
            <div className="flex flex-col gap-2">
              <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Giới thiệu
              </Link>
              {/* <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Giáo viên nổi tiếng
              </Link>
              <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Học sinh tiêu biểu
              </Link> */}
              <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Điều khoản chính sách
              </Link>
              <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Quy chế hoạt động
              </Link>
              <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Tuyển dụng
              </Link>
            </div>
          </div>
          <div className="col-span-1 space-y-5">
            <p className="font-bold text-xl uppercase">Dịch vụ</p>
            <div className="flex flex-col gap-2">
              <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Thư viện
              </Link>
              <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Ôn luyện
              </Link>
              {/* <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Speakup - Tiếng Anh 1 kèm 1 Online
              </Link>
              <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                ICANTECH - Đào tạo Công nghệ & Lập trình
              </Link> */}
            </div>
          </div>
          <div className="col-span-1 space-y-5">
            <p className="font-bold text-xl uppercase">HỖ TRỢ KHÁCH HÀNG</p>
            <div className="flex flex-col gap-2">
              <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Trung tâm hỗ trợ
              </Link>
              <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Email: otlichno.edu@gmail.com
              </Link>
              <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Đường dây nóng: +79533733420
              </Link>
            </div>
          </div>
          <div className="col-span-1 space-y-5">
            <p className="font-bold text-xl uppercase">DÀNH CHO ĐỐI TÁC</p>
            <div className="flex flex-col gap-2">
              <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Email: otlichno.edu@gmail.com
              </Link>
              <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Tel: +84 (00) 0123456789
              </Link>
              <Link
                to={"/"}
                className="hover:text-primary transition-all duration-200"
              >
                Fax: +84 (00) 4568-2587
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-t-border-gray py-3">
          <p className="text-center">
            Copyright © 2024-2034 | All rights reserved OTLICHNO
          </p>
        </div>
      </div>
    </div>
  );
};

export default LayoutCommon;
