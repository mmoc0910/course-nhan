import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LayoutAuthentication from "../layouts/layouts/LayoutAuthen";
import { useSelector } from "react-redux";
import { useToogleValue } from "../hooks/useToogleValue";
import { useForm } from "react-hook-form";
import { RootState } from "../store/configureStore";
import FormGroup from "../components/common/FormGroup";
import { Label } from "../components/label";
import { Input } from "../components/input";
import IconEyeToogle from "../icons/IconEyeToogle";
import axios from "axios";
import { toast } from "react-toastify";
import { DropdownWithComponents } from "../components/dropdown";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { uploadFireStore } from "../utils/uploadFireStore";
import { api } from "../api";
import { passwordRegex } from "../constanst";

const roles = [
  { role: 1, title: "Học sinh" },
  { role: 2, title: "Phụ huynh" },
  { role: 3, title: "Giáo viên" },
];
const schema = yup
  .object({
    name: yup.string().required("Họ và tên không được để trống"),
    username: yup.string().required("Tên đăng nhập không được để trống"),
    email: yup
      .string()
      .required("Email không được để trống")
      .email("Không đúng định dạng email"),
    password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .min(8, "Mật khẩu tối thiểu 8 ký tự")
      .max(30, "Mật khẩu tối đa 30 ký tự")
      .matches(passwordRegex, {
        message: "Mật khẩu phải bao gồm: chữ thường, chữ in hoa, ký đặc biệt và chữ số",
      }),
    role: yup.number().required().positive().integer(),
  })
  .required();
const SignupPage = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [certificate, setCertificate] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const { value: tooglePassword, handleToogleValue: handleTooglePassword } =
    useToogleValue();
  const { handleSubmit, control, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  useEffect(() => {
    setValue("role", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const roleWatch = watch("role");
  useEffect(() => {
    if (auth) {
      if (auth.role === 3) {
        navigate("/teacher/dashboard");
      } else {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  const onSubmit = async (data: {
    name: string;
    username: string;
    email: string;
    password: string;
    role: number;
  }) => {
    try {
      setLoading(true);
      const { email, name, password, role, username } = data;
      let body;
      if (role === 3) {
        if (certificate) {
          const certificateURL = await uploadFireStore(certificate);
          body = {
            username,
            name,
            email,
            role,
            password,
            certificate: certificateURL,
          };
          console.log("certificateURL - ", certificateURL);
          await api.post("/auth/register", body);
          toast("Đăng ký tài khoản thành công");
          navigate("/sign-in");
        } else {
          toast("Bạn chưa chọn chứng chỉ giáo viên");
        }
      } else {
        body = { username, name, email, role, password };
        await api.post("/auth/register", body);
        toast("Đăng ký tài khoản thành công");
        navigate("/sign-in");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error);
        toast(error.response?.data.message);
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    } finally {
      setLoading(false);
    }
  };
  if (auth) return null;
  return (
    <LayoutAuthentication heading="Đăng ký">
      <p className="mb-[25px] md:mb-[30px] text-xs font-normal text-center md:text-sm md:font-medium text-text3">
        Bạn đã có tài khoản?{" "}
        <Link
          to={"/sign-in"}
          className="inline font-medium underline text-primary"
        >
          Đăng nhập
        </Link>
      </p>
      <form
        className="space-y-[15px] md:space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGroup>
          <Label htmlFor="name">Họ và tên*</Label>
          <Input name="name" control={control}></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="username">Tên đăng nhập*</Label>
          <Input name="username" control={control}></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">email*</Label>
          <Input
            name="email"
            placeholder={"example@gmail.com"}
            control={control}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Đăng ký với vai trò</Label>
          <DropdownWithComponents>
            <DropdownWithComponents.Select
              placeholder={
                roleWatch ? (
                  <span className="text-black">
                    {roles.find((i) => i.role === roleWatch)?.title}
                  </span>
                ) : (
                  <span className="text-text4">Select one</span>
                )
              }
            ></DropdownWithComponents.Select>
            <DropdownWithComponents.List>
              {roles.map((item) => (
                <DropdownWithComponents.Option
                  key={uuidv4()}
                  onClick={() => setValue("role", item.role)}
                >
                  {item.title}
                </DropdownWithComponents.Option>
              ))}
            </DropdownWithComponents.List>
          </DropdownWithComponents>
        </FormGroup>
        {roleWatch === 3 ? (
          <FormGroup>
            <Label htmlFor="certificate">Chứng chỉ giáo viên*</Label>
            <label htmlFor="certificate" className="block">
              <input
                onChange={(e) =>
                  e.target.files && setCertificate(e.target.files[0])
                }
                type="file"
                accept="application/pdf"
                className="hidden"
                id="certificate"
              />
              <div className="bg-secondary20 px-5 py-3 rounded-full font-medium text-white flex items-center gap-2 cursor-pointer">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
                  </svg>
                </span>
                <p className="line-clamp-1">
                  {certificate
                    ? certificate.name
                    : "Upload chứng chỉ của bạn (PDF)"}
                </p>
              </div>
            </label>
          </FormGroup>
        ) : null}
        <FormGroup>
          <Label htmlFor="password">Mật khẩu*</Label>
          <Input
            type={tooglePassword ? "text" : "password"}
            name="password"
            control={control}
          >
            <IconEyeToogle
              className="absolute -translate-y-1/2 cursor-pointer right-5 top-1/2"
              open={tooglePassword}
              onClick={handleTooglePassword}
            />
          </Input>
        </FormGroup>
        <button
          disabled={loading}
          className="disabled:cursor-not-allowed w-full text-white bg-primary py-3 rounded-lg font-semibold flex items-center justify-center h-[48px]"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-b-transparent animate-spin rounded-full" />
          ) : (
            "Đăng ký"
          )}
        </button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignupPage;
