import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useToogleValue } from "../hooks/useToogleValue";
import LayoutAuthentication from "../layouts/layouts/LayoutAuthen";
import FormGroup from "../components/common/FormGroup";
import { Label } from "../components/label";
import { Input } from "../components/input";
import IconEyeToogle from "../icons/IconEyeToogle";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../api";
import { RootState } from "../store/configureStore";
import { AuthType } from "../types";
import { signIn } from "../store/auth/authSlice";
import { passwordRegex } from "../constanst";

const schema = yup
  .object({
    username: yup.string().required("Tên đăng nhập không được để trống"),
    password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .min(8, "Mật khẩu tối thiểu 8 ký tự")
      .max(30, "Mật khẩu tối đa 30 ký tự")
      .matches(passwordRegex, {
        message: "Mật khẩu phải bao gồm: chữ thường, chữ in hoa, ký đặc biệt và chữ số",
      }),
  })
  .required();
const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { value: tooglePassword, handleToogleValue: handleTooglePassword } =
    useToogleValue();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  console.log("erors - ", errors);
  const { auth } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (auth) {
      if (auth.role === 4) navigate("/admin/dashboard");
      else navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      console.log("data - ", data);
      const result = await api.post<{ data: AuthType }>("/auth/login", data);
      console.log(result.data);
      dispatch(signIn({ auth: result.data.data }));
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
  if (auth) return null;
  return (
    <LayoutAuthentication heading="Chào mừng bạn quay trở lại">
      <p className="mb-[25px] md:mb-[30px] text-xs font-normal text-center md:text-sm md:font-medium text-text3">
        Bạn chưa có tài khoản?{" "}
        <Link
          to={"/sign-up"}
          className="inline font-medium underline text-primary"
        >
          Đăng ký
        </Link>
      </p>
      <form
        className="space-y-[15px] md:space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGroup>
          <Label htmlFor="username">Tên đăng nhập*</Label>
          <Input name="username" control={control}></Input>
        </FormGroup>
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
        <div className="flex justify-end">
          <Link
            to={"/forgot-password"}
            className="text-sm font-medium cursor-pointer select-none text-primary"
          >
            Quên mật khẩu?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary py-3 rounded-lg font-semibold"
        >
          Đăng nhập
        </button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignInPage;
