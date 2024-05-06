import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { passwordRegex } from "../constanst";
import { useToogleValue } from "../hooks/useToogleValue";
import axios from "axios";
import { toast } from "react-toastify";
import FormGroup from "../components/common/FormGroup";
import { Label } from "../components/label";
import { Input } from "../components/input";
import IconEyeToogle from "../icons/IconEyeToogle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setBreadcumb } from "../store/breadcumb/breadcumbSlice";
import { RootState } from "../store/configureStore";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { signOut } from "../store/auth/authSlice";
import classNames from "../utils/classNames";
const schema = yup
  .object({
    old_password: yup.string().required("Mật khẩu không được để trống"),
    new_password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .min(8, "Mật khẩu tối thiểu 8 ký tự")
      .max(30, "Mật khẩu tối đa 30 ký tự")
      .matches(passwordRegex, {
        message: "Mật khẩu phải bao gồm: chữ thường, chữ in hoa, ký đặc biệt và chữ số",
      }),
    re_new_password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .min(8, "Mật khẩu tối thiểu 8 ký tự")
      .max(30, "Mật khẩu tối đa 30 ký tự")
      .matches(passwordRegex, {
        message: "Mật khẩu tối thiểu 8 ký tự, bao gồm cả chữ và số",
      }),
  })
  .required();
const ChangePasswordPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    value: toogleOldPassword,
    handleToogleValue: handleToogleOldPassword,
  } = useToogleValue();
  const {
    value: toogleNewPassword,
    handleToogleValue: handleToogleNewPassword,
  } = useToogleValue();
  const {
    value: toogleReNewPassword,
    handleToogleValue: handleToogleReNewPassword,
  } = useToogleValue();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  useEffect(() => {
    dispatch(
      setBreadcumb([
        {
          title: "Đổi mật khẩu",
          url:
            auth?.role === 4
              ? "/admin/change-password"
              : "/teacher/change-password",
        },
      ])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = async (data: {
    re_new_password: string;
    new_password: string;
    old_password: string;
  }) => {
    try {
      setLoading(true);

      const { new_password, old_password, re_new_password } = data;
      if (new_password === re_new_password) {
        console.log("data - ", data);
        const { data: dataChangePass } = await axiosPrivate.patch(
          "/users/change-password",
          {
            old_password,
            new_password,
          }
        );
        console.log("data change pass - ", dataChangePass);
        dispatch(signOut());
        navigate("/sign-in");
        toast("Thay đổi mật khẩu thành công, vui lòng đăng nhập lại.");
      } else {
        toast("Xác nhận mật khẩu không khớp");
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
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classNames(
        "mx-auto flex flex-col gap-4",
        auth?.role === 1 || auth?.role === 2 ? "container mt-10 w-1/3" : "w-2/3 "
      )}
    >
      <FormGroup>
        <Label htmlFor="password">Mật khẩu cũ*</Label>
        <Input
          type={toogleOldPassword ? "text" : "password"}
          name="old_password"
          control={control}
        >
          <IconEyeToogle
            className="absolute -translate-y-1/2 cursor-pointer right-5 top-1/2"
            open={toogleOldPassword}
            onClick={handleToogleOldPassword}
          />
        </Input>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Mật khẩu mới*</Label>
        <Input
          type={toogleNewPassword ? "text" : "password"}
          name="new_password"
          control={control}
        >
          <IconEyeToogle
            className="absolute -translate-y-1/2 cursor-pointer right-5 top-1/2"
            open={toogleNewPassword}
            onClick={handleToogleNewPassword}
          />
        </Input>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Xác nhận mật khẩu mới*</Label>
        <Input
          type={toogleReNewPassword ? "text" : "password"}
          name="re_new_password"
          control={control}
        >
          <IconEyeToogle
            className="absolute -translate-y-1/2 cursor-pointer right-5 top-1/2"
            open={toogleReNewPassword}
            onClick={handleToogleReNewPassword}
          />
        </Input>
      </FormGroup>{" "}
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
  );
};

export default ChangePasswordPage;
