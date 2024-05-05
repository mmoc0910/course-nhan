import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AuthType } from "../../types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import FormGroup from "../../components/common/FormGroup";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { useToogleValue } from "../../hooks/useToogleValue";
import IconEyeToogle from "../../icons/IconEyeToogle";
import { Table, TableProps } from "antd";
import { DAY_FORMAT, passwordRegex } from "../../constanst";
import { Link } from "react-router-dom";

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
        message: "Mật khẩu tối thiểu 8 ký tự, bao gồm cả chữ và số",
      }),
  })
  .required();
const ChildPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [listChild, setListChild] = useState<AuthType[]>([]);
  console.log("listchild - ", listChild);
  const { value: tooglePassword, handleToogleValue: handleTooglePassword } =
    useToogleValue();
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchData = useCallback(async () => {
    try {
      if (auth) {
        const result = await axiosPrivate.get<AuthType>(`/users/${auth._id}`);
        setListChild(result.data.children);
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const onSubmit = async (data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const { email, name, password, username } = data;
      await axiosPrivate.post(`/auth/register-for-child`, {
        email,
        name,
        password,
        username,
      });
      fetchData();
      reset();
      toast("Success");
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
  const columns: TableProps<AuthType>["columns"] = useMemo(
    () => [
      {
        title: () => <p className="font-semibold font-primary">Họ và tên</p>,
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
          <Link
            to={`/children/${record._id}`}
            className="font-primary text-primary underline"
          >
            {text}
          </Link>
        ),
      },
      {
        title: () => (
          <p className="font-semibold font-primary">Tên đăng nhập</p>
        ),
        dataIndex: "username",
        key: "username",
        render: (text) => <p className="font-primary">{text}</p>,
      },
      {
        title: () => <p className="font-semibold font-primary">Email</p>,
        dataIndex: "email",
        key: "email",
        render: (text) => <p className="font-primary">{text}</p>,
      },

      {
        title: () => <p className="font-semibold font-primary">Ngày đăng ký</p>,
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => <p className="font-primary">{DAY_FORMAT(text)}</p>,
      },
    ],
    []
  );
  return (
    <div className="space-y-10 container mt-10">
      <form
        className="grid grid-cols-2 gap-5"
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
        <button className="col-span-2 w-full text-white bg-primary py-3 rounded-lg font-semibold flex items-center justify-center h-[48px]">
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-b-transparent animate-spin rounded-full" />
          ) : (
            "Đăng ký"
          )}
        </button>
      </form>
      <div className="rounded-xl border border-border-gray overflow-hidden">
        <Table dataSource={listChild} columns={columns} loading={loading} />
      </div>
    </div>
  );
};

export default ChildPage;
