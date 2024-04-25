import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { api } from "../../api";
import { AuthType, IntroduceType } from "../../types";
import FormGroup from "../../components/common/FormGroup";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import ReactQuill from "react-quill";
import { uploadFireStore } from "../../utils/uploadFireStore";
import { signIn } from "../../store/auth/authSlice";
import classNames from "../../utils/classNames";
import { setBreadcumb } from "../../store/breadcumb/breadcumbSlice";

const modules = {
  toolbar: [
    ["italic", "bold", "underline"],
    ["link"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
};
const schema = yup
  .object({
    email: yup
      .string()
      .required("Email không được để trống")
      .email("Không đúng định dạng email"),
    name: yup.string().required("Họ và tên không được để trống"),
    introduce: yup.string(),
  })
  .required();
const AcoountUserPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>();
  console.log("avatar - ", avatar);
  const [file, setFile] = useState<File>();
  const { handleSubmit, control, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const introduceWatch = watch("introduce");
  useEffect(() => {
    dispatch(
      setBreadcumb([
        {
          title: "Tài khoản của tôi",
          url: auth?.role === 4 ? "/admin/account" : "/teacher/account",
        },
      ])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (auth) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  const fetchData = async () => {
    try {
      const result = await api.get<AuthType>(`/users/${auth?._id}`);
      const { email, name, description } = result.data;
      setValue("email", email);
      setValue("name", name);
      if (description) {
        const { avatarURL, introduce } = JSON.parse(
          description
        ) as IntroduceType;
        avatarURL && setAvatar(avatarURL);
        introduce && setValue("introduce", introduce);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data: {
    name: string;
    email: string;
    introduce?: string;
  }) => {
    try {
      if (auth) {
        setLoading(true);
        console.log("data - ", data);
        let avatarURL = avatar;
        if (file) avatarURL = await uploadFireStore(file);
        const result = await axiosPrivate.patch<{ data: AuthType }>(
          `/users/${auth._id}`,
          {
            email: data.email,
            name: data.name,
            description: JSON.stringify({
              introduce: data.introduce,
              avatarURL,
            }),
          }
        );
        const { description, name, email } = result.data.data;
        dispatch(signIn({ auth: { ...auth, name, email, description } }));
        console.log("result - ", result);
        toast("Chỉnh sửa thành công");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const debouncedContentChange = _.debounce((value) => {
    setValue("introduce", value);
    // console.log(value);
  }, 1000);
  const handleContentDebouncedChange = (value: string) => {
    debouncedContentChange(value);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classNames(
        "grid grid-cols-3 gap-10",
        auth?.role === 1 || auth?.role === 2 ? "container mt-10" : ""
      )}
    >
      <div className="">
        <div className="w-3/4 aspect-square mx-auto">
          <div className="rounded-full w-full h-full relative">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                className="w-full h-full object-cover rounded-full"
              />
            ) : avatar ? (
              <img
                src={avatar}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full" />
            )}

            <label
              htmlFor="avatar"
              className="absolute bottom-0 right-1/4 bg-white cursor-pointer w-10 h-10 rounded-full border border-dashed border-text4 flex items-center justify-center"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z" />
                </svg>
              </span>
            </label>
          </div>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
          />
        </div>
      </div>
      <div className="col-span-2 space-y-10">
        <div className="grid grid-cols-2 gap-10">
          <FormGroup>
            <Label htmlFor="name">Họ và tên*</Label>
            <Input name="name" control={control} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Địa chỉ email*</Label>
            <Input name="email" type="email" control={control} />
          </FormGroup>
        </div>
        <FormGroup className="col-span-2">
          <Label>Giới thiệu bản thân</Label>
          <ReactQuill
            placeholder=""
            modules={modules}
            theme="snow"
            value={introduceWatch}
            onChange={handleContentDebouncedChange}
          />
        </FormGroup>
      </div>
      <button
        disabled={loading}
        className="col-span-3 w-full disabled:cursor-not-allowed text-white bg-primary py-3 rounded-lg font-semibold flex items-center justify-center h-[48px]"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-b-transparent animate-spin rounded-full" />
        ) : (
          "Chỉnh sửa thông tin"
        )}
      </button>
    </form>
  );
};

export default AcoountUserPage;
