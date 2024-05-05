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
const schema = yup
  .object({
    email: yup
      .string()
      .required("Email không được để trống")
      .email("Không đúng định dạng email"),
  })
  .required();

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const onSubmit = async (data: { email: string }) => {
    try {
      setLoading(true);
      console.log("data - ", data);
      const { email } = data;
      const result = await api.post(`/users/forgot-password`, { email });
      console.log("result - ", result.data);
      reset();
      toast("Vui lòng kiểm tra email của bạn để đổi mật khẩu");
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
    <LayoutAuthentication heading="Quên mật khẩu">
      <form
        className="space-y-[15px] md:space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGroup>
          <Label htmlFor="email">Email*</Label>
          <Input name="email" control={control}></Input>
        </FormGroup>
        <button
          disabled={loading}
          className="disabled:cursor-not-allowed w-full text-white bg-primary py-3 rounded-lg font-semibold flex items-center justify-center h-[48px]"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-b-transparent animate-spin rounded-full" />
          ) : (
            "Xác nhận"
          )}
        </button>
      </form>
    </LayoutAuthentication>
  );
};

export default ForgotPasswordPage;
