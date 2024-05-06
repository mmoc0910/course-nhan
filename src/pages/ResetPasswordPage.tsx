import { useForm } from "react-hook-form";
import LayoutAuthentication from "../layouts/layouts/LayoutAuthen";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import FormGroup from "../components/common/FormGroup";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { api } from "../api";
import { useState } from "react";
import { passwordRegex } from "../constanst";
import { useLocation, useNavigate } from "react-router-dom";
import { useToogleValue } from "../hooks/useToogleValue";
import IconEyeToogle from "../icons/IconEyeToogle";
const schema = yup
  .object({
    password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .min(8, "Mật khẩu tối thiểu 8 ký tự")
      .max(30, "Mật khẩu tối đa 30 ký tự")
      .matches(passwordRegex, {
        message: "Mật khẩu phải bao gồm: chữ thường, chữ in hoa, ký đặc biệt và chữ số",
      }),
    re_password: yup.string().required("Xác nhận mật khẩu không được để trống"),
  })
  .required();

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  console.log("token - ", token);
  const [loading, setLoading] = useState<boolean>(false);
  const { value: tooglePassword, handleToogleValue: handleTooglePassword } =
    useToogleValue();
  const { value: toogleRePassword, handleToogleValue: handleToogleRePassword } =
    useToogleValue();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const onSubmit = async (data: { password: string; re_password: string }) => {
    try {
      const { password, re_password } = data;
      setLoading(true);
      if (token)
        if (password === re_password) {
          await api.post("/users/reset-password", { password, token });
          navigate("/sign-in");
          toast("Đổi mật khẩu thành công");
        } else {
          toast("Xác nhận mật khẩu không khớp");
        }
      else {
        navigate("/forgot-password");
        toast("Token hết hạn vui lòng nhập lại email để đổi mật khẩu");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error);
        toast(error.response?.data.message);
        navigate("/forgot-password");
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <LayoutAuthentication heading="Đặt mật khẩu mới">
      <form
        className="space-y-[15px] md:space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <FormGroup>
          <Label htmlFor="password">Xác nhận mật khẩu*</Label>
          <Input
            type={toogleRePassword ? "text" : "password"}
            name="re_password"
            control={control}
          >
            <IconEyeToogle
              className="absolute -translate-y-1/2 cursor-pointer right-5 top-1/2"
              open={toogleRePassword}
              onClick={handleToogleRePassword}
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
            "Đổi mật khẩu"
          )}
        </button>
      </form>
    </LayoutAuthentication>
  );
};

export default ResetPasswordPage;
