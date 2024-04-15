import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import FormGroup from "../../components/common/FormGroup";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DocumentType } from "../../types";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import _ from "lodash";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

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
  ],
};
const schema = yup
  .object({
    title: yup.string().required("Tiêu đề bài học không được để trống"),
    video: yup.string().required("Link video không được để trống"),
    description: yup.string(),
  })
  .required();
const AddLessonTeacherPage = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { courseId } = useParams();
  const { orderNumber } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfs, setPdfs] = useState<DocumentType[]>([{ title: "", url: "" }]);
  console.log("pdfs -", pdfs);
  const { handleSubmit, control, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const descriptionWatch = watch("description");
  const onSubmit = async (data: {
    title: string;
    video: string;
    description?: string;
  }) => {
    try {
      setLoading(true);
      console.log("data - ", data);
      const { title, video, description } = data;
      await axiosPrivate.post("/lessons", {
        order: Number(orderNumber),
        title,
        video,
        pdf: JSON.stringify(pdfs.filter((item) => item.title && item.url)),
        course: courseId,
        description: description || "",
      });
      toast("Thêm bài học thành công");
      navigate(`/teacher/courses/lessons/${courseId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const debouncedContentChange = _.debounce((value) => {
    setValue("description", value);
    // console.log(value);
  }, 1000);
  const handleContentDebouncedChange = (value: string) => {
    debouncedContentChange(value);
  };
  return (
    <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label htmlFor="title">Tiêu đề bài học*</Label>
        <Input name="title" control={control} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="video">Link video bài giảng*</Label>
        <Input name="video" control={control} />
      </FormGroup>
      <div className="col-span-2 grid grid-cols-2 gap-5">
        <Label className="col-span-2">Tài liệu bài giảng</Label>
        {pdfs.map((item, index) => (
          <div className="grid grid-cols-2 gap-5" key={uuidv4()}>
            <Label className="col-span-2 flex items-center justify-between">
              Tài liệu {index + 1}
              <span
                className="cursor-pointer"
                onClick={() =>
                  setPdfs((prev) => [...prev].filter((_, i) => i !== index))
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 fill-current"
                >
                  <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                </svg>
              </span>
            </Label>
            <input
              value={item.title}
              onChange={(e) =>
                setPdfs((prev) =>
                  [...prev].map((i, o) =>
                    o === index ? { ...i, title: e.target.value } : i
                  )
                )
              }
              type="text"
              placeholder="Tiêu đề tài liệu"
              className="focus:border-primary text-black font-medium placeholder:text-text4 py-3 px-[25px] rounded-[10px] border border-solid w-full bg-inherit peer outline-none border-strock"
            />
            <input
              value={item.url}
              onChange={(e) =>
                setPdfs((prev) =>
                  [...prev].map((i, o) =>
                    o === index ? { ...i, url: e.target.value } : i
                  )
                )
              }
              type="text"
              placeholder="Link tài liệu"
              className="focus:border-primary text-black font-medium placeholder:text-text4 py-3 px-[25px] rounded-[10px] border border-solid w-full bg-inherit peer outline-none border-strock"
            />
          </div>
        ))}
        <div className="mt-auto">
          <button
            type="button"
            className="px-5 py-3 rounded-lg bg-secondary40 font-medium text-white w-max"
            onClick={() => setPdfs((prev) => [...prev, { title: "", url: "" }])}
          >
            Thêm tài liệu
          </button>
        </div>
      </div>
      <FormGroup className="col-span-2">
        <Label>Mô tả bài học</Label>
        <ReactQuill
          placeholder=""
          modules={modules}
          theme="snow"
          value={descriptionWatch}
          onChange={handleContentDebouncedChange}
        />
      </FormGroup>
      <button className="col-span-2 w-full text-white bg-primary py-3 rounded-lg font-semibold flex items-center justify-center h-[48px]">
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-b-transparent animate-spin rounded-full" />
        ) : (
          "Thêm bài học mới"
        )}
      </button>
    </form>
  );
};

export default AddLessonTeacherPage;
